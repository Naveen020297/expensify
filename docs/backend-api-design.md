# Backend API & Data Model Design

> This file documents the backend contracts for the Expensify app.  
> The React Native frontend calls these REST endpoints. Implementation can be Node/Express or any other stack.

---

## Data model

### Users

```ts
User {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  createdAt: string; // ISO datetime
}
```

### Categories (with icon handling)

```ts
Category {
  id: string;
  type: 'PERSONAL' | 'SHARED';
  name: string;              // e.g. "Vegetables", "Tomato", "Lift"
  parentId?: string;         // for subcategories
  isCustom: boolean;
  createdBy?: string;        // userId for custom categories
  createdAt: string;

  iconType: 'IMAGE' | 'LETTER';
  iconImageUrl?: string;     // set when iconType === 'IMAGE'
  iconLetter?: string;       // set when iconType === 'LETTER'
}
```

**Icon rules**

- Built-in categories can be configured as `iconType: 'IMAGE'` with `iconImageUrl`.
- Custom categories:
  - For now, created as:
    - `iconType: 'LETTER'`
    - `iconLetter = first uppercase letter of name` (e.g. `"Tomato"` → `"T"`).
- Frontend renders:
  - If `iconType === 'IMAGE' && iconImageUrl` → show image.
  - Else → circular badge with `iconLetter` (or first letter of `name` if missing).
  - The **full category `name` is always shown under the icon**.

### Groups & member overrides (shared)

```ts
GroupMember {
  userId: string;
  isActive: boolean;        // global active flag
}

Group {
  id: string;
  name: string;             // e.g. "Apartment 301"
  ownerId: string;          // userId
  members: GroupMember[];
  createdAt: string;
}
```

Optional per‑month member overrides:

```ts
GroupMemberOverride {
  id: string;
  groupId: string;
  userId: string;
  month: string;    // "YYYY-MM"
  isActive: boolean;
}
```

### Expenses

```ts
QuantityUnit = 'kg' | 'g' | 'l' | 'ml' | 'piece' | 'pack' | 'hour' | 'km' | 'month';
CurrencyCode = 'INR' | 'USD' | 'EUR'; // extend as needed

ExpenseBase {
  id: string;
  categoryId: string;     // leaf category (e.g. "Tomato")
  label: string;          // human label, usually category name
  quantity: number;
  quantityUnit: QuantityUnit;
  pricePerUnit: number;
  currency: CurrencyCode;
  totalAmount: number;    // derived = quantity * pricePerUnit
  notes?: string;
  expenseDate: string;    // ISO date "YYYY-MM-DD"
  createdAt: string;      // ISO datetime
  updatedAt?: string;
  createdBy: string;      // userId
}
```

Personal:

```ts
PersonalExpense extends ExpenseBase {
  type: 'PERSONAL';
}
```

Shared:

```ts
SharedExpenseSplit {
  memberUserId: string;
  shareAmount: number;
  included: boolean;      // false if excluded for this particular expense
}

SharedExpense extends ExpenseBase {
  type: 'SHARED';
  groupId: string;
  splits: SharedExpenseSplit[];
}
```

### JSON persistence (for now)

- `data/users.json`: `User[]`
- `data/categories.json`: `Category[]`
- `data/groups.json`: `Group[]`
- `data/group_member_overrides.json`: `GroupMemberOverride[]`
- `data/expenses.json`: `(PersonalExpense | SharedExpense)[]`

---

## REST endpoints

### Auth

#### POST `/auth/signup`

**Body**

```json
{
  "email": "user@example.com",
  "password": "PlainTextForNow",
  "name": "John Doe"
}
```

**Response 201**

```json
{
  "user": {
    "id": "u_123",
    "email": "user@example.com",
    "name": "John Doe",
    "createdAt": "2026-02-13T10:00:00.000Z"
  },
  "token": "jwt-token"
}
```

---

#### POST `/auth/login`

**Body**

```json
{
  "email": "user@example.com",
  "password": "PlainTextForNow"
}
```

**Response 200**

```json
{
  "user": {
    "id": "u_123",
    "email": "user@example.com",
    "name": "John Doe"
  },
  "token": "jwt-token"
}
```

---

### Categories

#### GET `/categories`

Query params:

- `type`: `PERSONAL` | `SHARED` (optional)
- `parentId`: parent category id (optional)

**Response 200**

```json
{
  "items": [
    {
      "id": "cat_veg",
      "type": "PERSONAL",
      "name": "Vegetables",
      "parentId": null,
      "isCustom": false,
      "createdBy": null,
      "createdAt": "2026-02-10T09:00:00.000Z",
      "iconType": "IMAGE",
      "iconImageUrl": "https://cdn.example.com/icons/vegetables.png",
      "iconLetter": null
    },
    {
      "id": "cat_tomato",
      "type": "PERSONAL",
      "name": "Tomato",
      "parentId": "cat_veg",
      "isCustom": true,
      "createdBy": "u_123",
      "createdAt": "2026-02-11T09:00:00.000Z",
      "iconType": "LETTER",
      "iconImageUrl": null,
      "iconLetter": "T"
    }
  ]
}
```

#### POST `/categories`

Used for custom categories and subcategories.

**Body**

```json
{
  "type": "PERSONAL",
  "name": "Tomato",
  "parentId": "cat_veg"
}
```

Backend sets:

- `isCustom = true`
- `createdBy = currentUser.id`
- `createdAt = now`
- `iconType = 'LETTER'`
- `iconLetter = first uppercase letter of name`

**Response 201**

```json
{
  "id": "cat_tomato",
  "type": "PERSONAL",
  "name": "Tomato",
  "parentId": "cat_veg",
  "isCustom": true,
  "createdBy": "u_123",
  "createdAt": "2026-02-13T10:00:00.000Z",
  "iconType": "LETTER",
  "iconImageUrl": null,
  "iconLetter": "T"
}
```

---

### Users (for member selection)

#### GET `/users`

**Response 200**

```json
{
  "items": [
    { "id": "u_1", "email": "a@example.com", "name": "Alice" },
    { "id": "u_2", "email": "b@example.com", "name": "Bob" }
  ]
}
```

---

### Groups (shared homes)

#### POST `/groups`

**Body**

```json
{
  "name": "Apartment 301",
  "memberIds": ["u_1", "u_2", "u_3"]
}
```

**Response 201**

```json
{
  "id": "g_1",
  "name": "Apartment 301",
  "ownerId": "u_1",
  "members": [
    { "userId": "u_1", "isActive": true },
    { "userId": "u_2", "isActive": true },
    { "userId": "u_3", "isActive": true }
  ],
  "createdAt": "2026-02-13T10:00:00.000Z"
}
```

#### GET `/groups`

Query:

- `ownerId` (optional)

**Response**

```json
{
  "items": [/* Group[] */]
}
```

#### PATCH `/groups/:id/members` (optional)

Global membership flags:

```json
{
  "members": [
    { "userId": "u_1", "isActive": true },
    { "userId": "u_2", "isActive": false }
  ]
}
```

Or per‑month overrides:

```json
{
  "overrides": [
    {
      "userId": "u_2",
      "month": "2026-02",
      "isActive": false
    }
  ]
}
```

---

### Personal expenses

#### POST `/expenses/personal`

**Body**

```json
{
  "categoryId": "cat_tomato",
  "label": "Tomatoes",
  "quantity": 2,
  "quantityUnit": "kg",
  "pricePerUnit": 30,
  "currency": "INR",
  "expenseDate": "2026-02-13",
  "notes": "From local market"
}
```

Backend:

- Validates category type is `PERSONAL`.
- Computes `totalAmount = quantity * pricePerUnit`.
- Adds `type = 'PERSONAL'`, ids and timestamps.

**Response 201**

```json
{
  "id": "exp_123",
  "type": "PERSONAL",
  "categoryId": "cat_tomato",
  "label": "Tomatoes",
  "quantity": 2,
  "quantityUnit": "kg",
  "pricePerUnit": 30,
  "currency": "INR",
  "totalAmount": 60,
  "expenseDate": "2026-02-13",
  "notes": "From local market",
  "createdBy": "u_123",
  "createdAt": "2026-02-13T10:05:00.000Z"
}
```

#### GET `/expenses/personal`

Query params:

- `fromDate`, `toDate` (ISO dates) or `month` (e.g. `"2026-02"`)
- `categoryId` (optional)
- `page` (default `1`)
- `pageSize` (default `20`)

**Response 200**

```json
{
  "items": [/* PersonalExpense[] */],
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "totalItems": 120,
    "totalPages": 6
  },
  "filters": {
    "fromDate": "2026-02-01",
    "toDate": "2026-02-28",
    "categoryId": null,
    "month": "2026-02"
  }
}
```

---

### Shared expenses

#### POST `/expenses/shared`

**Body**

```json
{
  "groupId": "g_1",
  "categoryId": "cat_lift",
  "label": "Lift maintenance",
  "quantity": 1,
  "quantityUnit": "month",
  "pricePerUnit": 3000,
  "currency": "INR",
  "expenseDate": "2026-02-10",
  "notes": "Monthly lift bill",

  "includedMemberIds": ["u_1", "u_2"],
  "splitMode": "EQUAL"
}
```

Backend:

- Loads group and (optionally) per‑month overrides.
- Determines which members are active and included.
- Computes:
  - `totalAmount = quantity * pricePerUnit`.
  - `shareAmount = totalAmount / includedMembers.length`.
- Builds `splits[]`.

**Response 201**

```json
{
  "id": "exp_sh_1",
  "type": "SHARED",
  "groupId": "g_1",
  "categoryId": "cat_lift",
  "label": "Lift maintenance",
  "quantity": 1,
  "quantityUnit": "month",
  "pricePerUnit": 3000,
  "currency": "INR",
  "totalAmount": 3000,
  "expenseDate": "2026-02-10",
  "notes": "Monthly lift bill",
  "createdBy": "u_1",
  "createdAt": "2026-02-13T11:00:00.000Z",
  "splits": [
    { "memberUserId": "u_1", "shareAmount": 1500, "included": true },
    { "memberUserId": "u_2", "shareAmount": 1500, "included": true },
    { "memberUserId": "u_3", "shareAmount": 0, "included": false }
  ]
}
```

#### GET `/expenses/shared`

Query params:

- `groupId` (required)
- `fromDate`, `toDate` or `month`
- `memberId` (optional)
- `page`, `pageSize`

**Response 200**

```json
{
  "items": [/* SharedExpense[] */],
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "totalItems": 40,
    "totalPages": 2
  },
  "filters": {
    "groupId": "g_1",
    "fromDate": "2026-02-01",
    "toDate": "2026-02-28",
    "month": "2026-02",
    "memberId": null
  }
}
```

---

### Reports & PDFs

#### GET `/reports/personal/summary`

Query:

- `userId` (optional if derived from auth)
- `fromDate`, `toDate` or `month`

**Response 200**

```json
{
  "period": { "from": "2026-02-01", "to": "2026-02-28" },
  "totalAmount": 12000,
  "currency": "INR",
  "byCategory": [
    { "categoryId": "cat_veg", "categoryName": "Vegetables", "totalAmount": 3000 },
    { "categoryId": "cat_elec", "categoryName": "Electricity", "totalAmount": 2000 }
  ]
}
```

#### GET `/reports/personal/pdf`

- Same query as summary.
- Responds with `Content-Type: application/pdf` and binary content.

---

#### GET `/reports/shared/summary`

Query:

- `groupId` (required)
- `fromDate`, `toDate` or `month`

**Response 200**

```json
{
  "groupId": "g_1",
  "period": { "from": "2026-02-01", "to": "2026-02-28" },
  "groupTotal": 9000,
  "currency": "INR",
  "perMemberTotals": [
    { "userId": "u_1", "name": "Alice", "totalShare": 3000 },
    { "userId": "u_2", "name": "Bob", "totalShare": 3000 },
    { "userId": "u_3", "name": "Charlie", "totalShare": 3000 }
  ],
  "netBalances": [
    { "userId": "u_1", "net": -1000 },
    { "userId": "u_2", "net": 500 },
    { "userId": "u_3", "net": 500 }
  ]
}
```

#### GET `/reports/shared/pdf`

- Same query as shared summary.
- Responds with `Content-Type: application/pdf` and binary content.

