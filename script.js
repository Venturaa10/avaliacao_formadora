const formulario = document.getElementById('idformulario');
const campos = document.querySelectorAll('.input_validate');
const spans = document.querySelectorAll('.span_mensagem');

formulario.addEventListener('submit', async event => {
    /** Responsabilidades
     * Variaveis:
     * "eValido" -> Recebe true se as validações forem validas, e false para invalidas.
     * lista "validadores" -> Armazena todas as validações do formulario.
     * 
     * loop for:
     * Percorre a lista "validadores" e define cada item (validação) é definida como "validador".
     * Se algum "validador" retornar "false", "eValido" recebe "false" como valor.
     * 
     * Condicional:
     * Se "eValido" for "true", significa que todas as validações estão corretas.
     * Exibe uma mensagem informando do sucesso do cadastro ao usuario.
     * 
     * Se não, impede o envio do formulario.
     */

    event.preventDefault(); // Impede o envio do formulário em caso de tentativo de envio antes da validação das informações.

    let eValido = true;

    const validadores = [
        validaNomeCompleto,
        validaCPF,
        validaSenha,
        validaConfirmaSenha,
        validaLogin,
        validaNomeMaterno,
        validaTelCelular,
        validaTelFixo,
        validaEndCompleto,
    ];

    for (const validador of validadores) {
        if (!validador()) {
            eValido = false;
        }
    }

    if (eValido) {
        alert('Cadastro realizado com sucesso!');
        window.location = 'formulario.html'; // Redireciona para o formulario novamente após sucesso.
    } else {
        console.log("Por favor, preencha todos os campos corretamente.");
    }
});

function setError(element, span, mensagem) {
    /** Estilizar o span caracterizando um input invalido.
     * 
     * Parametros:
     * element -> index do campo (tag "span" no HTML).
     * span -> index do span. 
     * mensagem -> Mensagem personalizada de acordo com o campo invalido.
     * 
     * Variaveis:
     * element. -> Aplica borda ao elemento.
     * span. -> Define display "block" para o span ficar visivel.
     * .textContent -> Exibe mensagem no span da pagina HTML de acordo com o campo invalido.
     */ 
    element.style.border = '3px solid #af3030';
    span.style.display = 'block';
    span.textContent = mensagem; 

}

function removeError(element, span) {
    /** Estilizar o span caracterizando um input valido.
     * 
     * Parametros:
     * element -> index do campo (tag "span" no HTML).
     * span -> index do span. 
     * 
     * Variaveis:
     * element. -> Retira a borda do elemento.
     * span. -> Define display "none" para o span ficar oculto.
     */
    element.style.border = '';
    span.style.display = 'none';
    
}

function validaCampo(index, condicao, mensagem) {
    /** Responsabilidades
     * Parametros:
     * index -> Recebe o index do input do HTML.
     * condicao -> recebe valor do campo e define como true (campo valido) ou false (campo invalido).
     * 
     * Condicional:
     * Se "condição" true, chama função para ocultar "span".
     * Se não, aplica estilo de borda, torna o span visivel e exibe mensagem de erro personalizada.
     * 
     * Retorno:
     * true -> Para validações validas.
     * false -> Para validações invalidas.
     */
    if (condicao) {
        removeError(campos[index], spans[index]);
        return true;
    } else {
        setError(campos[index], spans[index], mensagem);
        return false;
    }
}

function validaNomeCompleto() {
    const nome = campos[0].value;
    return validaCampo(0, regexNome(nome), "O campo Nome deve ter no mínimo dez caracteres alfabéticos, incluindo espaços. O primeiro caractere deve ser maiúscula.");
}

function validaCPF() {
    const cpf = campos[1].value; 
    return validaCampo(1, TestaCPFvalido(cpf), "O campo CPF deve ser valido e seguir o seguinte formato: 000.111.222-33");

}

function validaSenha() {
    const senha = campos[2].value; 
    const regex = /^[a-zA-Z0-9]{7,}$/; 
    return validaCampo(2, regex.test(senha), "O campo Senha requer uma composição de exatamente sete caracteres alfanuméricos.");
}

function validaConfirmaSenha() {
    const senha = campos[2].value;
    const confirmaSenha = campos[3].value;
    return validaCampo(3, senha === confirmaSenha, "Confirmação de senha deve ser igual a senha.");
}

function validaLogin() {
    const login = campos[4].value; 
    const regex = /^[A-Z]{5}$/;
    return validaCampo(4, regex.test(login), "O campo Login deve ser preenchido com exatamente cinco caracteres alfabéticos, todos em letras maiúsculas.");
}

function validaNomeMaterno() {
    const nomeMaterno = campos[5].value;
    return validaCampo(5, regexNome(nomeMaterno), "O campo Nome Materno deve ter no mínimo dez caracteres alfabéticos, incluindo espaços. O primeiro caractere deve ser maiúscula.");
}

function validaTelCelular() {
    const celular = campos[6].value; 
    const regex = /^\+55\(\d{2}\)\d{5}-\d{4}$/;
    return validaCampo(6, regex.test(celular), "O campo celular deve ter o seguinte formato +55(21)99565-1622");
}

function validaTelFixo() {
    const telefone = campos[7].value;
    const regex = /^\+55\(\d{2}\)[2-5]\d{4}-\d{4}$/;
    return validaCampo(7, regex.test(telefone), "O campo celular deve ter o seguinte formato +55(21)49565-1622. Porém o primeiro número da sequência de cinco dígitos deve ser um dos seguintes valores: 2, 3, 4 ou 5. Conforme exemplo.");
}

function validaEndCompleto() {
    const endereco = campos[8].value; 
    const regex = /^(Rua|Avenida|Av\.|Travessa)\s+[a-zA-Z0-9\s]{10,}$/i;
    return validaCampo(8, regex.test(endereco), "O campo de endereço deve ser preenchido com o nome da rua, avenida ou travessa, seguido de um número e, se necessário, informações adicionais. O campo deve conter uma sequência de pelo menos dez caracteres alfanuméricos, incluindo espaços. Exemplo: Rua Nome da Rua 123");
}

function regexNome(nome) {
    /** Verifica se parametro "nome" está de acordo com o padrão em regex.
    * 
    * Retorna:
    * true -> Segue o padrão do regex.
    * false -> Não segue o padrão do regex.
    */
    const regex = /^[A-Z][a-zA-ZÀ-ÿ ]{9,}$/;
    return regex.test(nome);
}


function TestaCPFvalido(strCPF) {
    /** Recebe CPF como parametro e verifica se está de acordo com o algoritmo do padrão brasileiro de documentos,
     * aceitando apenas o formato XXX.XXX.XXX-XX.
     *
     * Retorna:
     * true -> Documento válido.
     * false -> Documento inválido ou formato incorreto.
     */

    // Regex para validar o formato do CPF (com pontos e traço obrigatórios)
    const regexCPF = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

    // Verifica se o CPF está no formato correto (com pontos e traços)
    if (!regexCPF.test(strCPF)) {
        return false;
    }

    // Remover os pontos e traços para a validação do algoritmo do CPF
    strCPF = strCPF.replace(/\D/g, '');  // Remove tudo que não for número

    let Soma = 0;
    let Resto;

    // Se o CPF for "00000000000", é inválido
    if (strCPF === "00000000000") return false;

    // Validação do primeiro dígito verificador
    for (let i = 1; i <= 9; i++) {
        Soma += parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    }
    Resto = (Soma * 10) % 11;

    if (Resto === 10 || Resto === 11) Resto = 0;
    if (Resto !== parseInt(strCPF.substring(9, 10))) return false;

    Soma = 0;

    // Validação do segundo dígito verificador
    for (let i = 1; i <= 10; i++) {
        Soma += parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    }
    Resto = (Soma * 10) % 11;

    if (Resto === 10 || Resto === 11) Resto = 0;
    if (Resto !== parseInt(strCPF.substring(10, 11))) return false;

    return true;
}
