// Function to delete an expense entry
export const deleteExpense = async (id) => {
    const response = await fetch(`/api/expenses/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    if (!response.ok) {
        throw new Error('Failed to delete expense');
    }
    return response.json();
};