export function validateInput(value, type) {
    let errorMessage = "";

    switch (type) {
        case "text":
            if (!value.trim()) {
                errorMessage = "Este campo é obrigatório.";
            }
            else if (/\d/.test(value)) {
                errorMessage = "O campo não deve conter números.";
            } else if (/[^a-zA-ZÀ-ÿ\s-]/.test(value)) {
                errorMessage = "O campo não deve conter caracteres inválidos.";
            }
            break;

        case "email":
            if (!value.trim()) {
                errorMessage = "O email é obrigatório.";
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                errorMessage = "O email deve ser válido.";
            }
            break;

        case "password":
            if (!value.trim()) {
                errorMessage = "A senha é obrigatória.";
            } else if (value.length < 6) {
                errorMessage = "A senha deve ter pelo menos 6 caracteres.";
            }
            break;

        default:
            errorMessage = "Tipo de validação não suportado.";
            break;
    }

    return errorMessage;
}