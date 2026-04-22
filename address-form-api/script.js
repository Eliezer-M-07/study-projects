async function search(cep) {
    try{
        const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        return await res.json();
    }catch(err) {
        console.error(err);
    }
}

const cepInput = document.getElementById('cep');

cepInput.addEventListener('blur', async () => {
    const cep = cepInput.value;
    const cepLimpo = cep.replace(/\D/g, '');

    if (/^\d{8}$/.test(cepLimpo)) 
    {
        const data = await search(cepLimpo);

        if (!data) {
            feedback.innerText = "Erro ao buscar CEP.";
            return;
        };

        if(!data.erro)
        {
            document.getElementById('feedback').innerText = '';
            document.getElementById('address').value = data.logradouro;
            document.getElementById('neighborhood').value = data.bairro
            document.getElementById('city').value = data.localidade;
            document.getElementById('state').value = data.uf;
        }else{
            document.getElementById('feedback').innerText = 'Informe um CEP válido.';
        }
    }
})
