// Existing code...

// Add DELETE method for deleting an expense
export const deleteExpense = async (id) => {
    const response = await axios.delete(`/api/expenses/${id}`);
    return response;
};