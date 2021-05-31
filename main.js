//url da api
const url = 'https://pokeapi.co/api/v2/pokemon/';

//cliques dos botões
$(document).find('.pokePesquisa').on('click', function(){
    let pokemon = $('.pokeBusca').find('input').val();
    $(document).find('p').css('display', 'none');    

    if(pokemon != ''){
        pokemon.toLowerCase();
        BuscaPokemon(pokemon);
        $(document).find('.formPoke').css("display", "flex")
        $(document).find('.pokeTable').css('display', 'none');
    }else{
        alert('Preencha o nome do Pokemon');
    }
});

$(document).find('.pokeSalva').on('click', function(){
    let dataPoke = [];
    $(document).find('.formPoke').css("display", "none")
    dataPoke.push($(document).find('input[name="nome"]').val());
    dataPoke.push($(document).find('input[name="tipo"]').val());
    dataPoke.push($(document).find('input[name="peso"]').val());
    dataPoke.push($(document).find('input[name="altura"]').val());
    dataPoke.push($(document).find('input[name="vida"]').val());
    dataPoke.push($(document).find('input[name="ataque"]').val());
    dataPoke.push($(document).find('input[name="defesa"]').val());
    dataPoke.push($(document).find('input[name="at especial"]').val());
    dataPoke.push($(document).find('input[name="def especial"]').val());
    dataPoke.push($(document).find('input[name="velocidade"]').val());
    pokeTable(dataPoke);
});

$('tbody').on('dblclick', function(event){
    if (confirm('Deseja deletar o pokemon salvo?')) {
        $(event.target).closest("tr").remove();
      }
});

$('.pokeTable').find('table tbody').click(function(event){
    $(event.target).attr('contenteditable', 'true');
});


$('.pokeTable').find('table tbody').focusout(function(event){
    $(event.target).attr('contenteditable', 'false');
})

//função que consulta api e retorna um pokemon
function BuscaPokemon(pokemon){
    fetch(url + pokemon)
    .then(response => response.json())
    .then(data => carregaPokemon(data))
    .catch(err => alert('Erro na pesquisa, favor verifque o nome do pokemon ' + err));
    return;
}

//função que carrega os dados do pokemon no form
function carregaPokemon(data){    
    $(document).find('input[name="nome"]').val(data.name);
    $(document).find('input[name="tipo"]').val(data.types[0].type.name);
    $(document).find('input[name="peso"]').val(data.weight);
    $(document).find('input[name="altura"]').val(data.height);
    $(document).find('input[name="vida"]').val(data.stats[0].base_stat);
    $(document).find('input[name="ataque"]').val(data.stats[1].base_stat);
    $(document).find('input[name="defesa"]').val(data.stats[2].base_stat);
    $(document).find('input[name="at especial"]').val(data.stats[3].base_stat);
    $(document).find('input[name="def especial"]').val(data.stats[4].base_stat);
    $(document).find('input[name="velocidade"]').val(data.stats[5].base_stat);
}

//função que adiciona os pokemons salvos na tabela
function pokeTable(dataPoke){
    $(document).find('.pokeTable').css('display', 'block');
    $(document).find('p').css('display', 'flex');    
    let lines = '<tr>';
    for(i in dataPoke){
        let td = '<td contenteditable="false">' + dataPoke[i] + '</td>'
        lines += td;
    }
    lines += '<td><button class="btn btn-danger delete">Del</button></td>'
    lines += '</tr>'

    $('.pokeTable').find('tbody').append(lines);
}