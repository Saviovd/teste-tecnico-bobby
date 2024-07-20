export function applyFilter(users, query) {
    const lowerQuery = query.toLowerCase();
    return users
        .filter(user => {
            const name = user.name || "";
            const email = user.email || "";
            return name.toLowerCase().includes(lowerQuery) || email.toLowerCase().includes(lowerQuery);
        });
}

export function sortUsers(users, query) {
    const lowerQuery = query.toLowerCase();
    return users.sort((a, b) => {
        const aName = a.name ? a.name.toLowerCase() : "";
        const bName = b.name ? b.name.toLowerCase() : "";
        const aEmail = a.email ? a.email.toLowerCase() : "";
        const bEmail = b.email ? b.email.toLowerCase() : "";

        const aStartsWithQuery = aName.startsWith(lowerQuery) || aEmail.startsWith(lowerQuery);
        const bStartsWithQuery = bName.startsWith(lowerQuery) || bEmail.startsWith(lowerQuery);

        if (aStartsWithQuery && !bStartsWithQuery) return -1;
        if (!aStartsWithQuery && bStartsWithQuery) return 1;

        if (aName < bName) return -1;
        if (aName > bName) return 1;
        if (aEmail < bEmail) return -1;
        if (aEmail > bEmail) return 1;

        return 0;
    });
}