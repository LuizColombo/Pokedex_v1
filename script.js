let url_pokemon = 'https://pokeapi.co/api/v2/pokemon/';
let url_type = 'https://pokeapi.co/api/v2/type/';
let url_habitat = 'https://pokeapi.co/api/v2/pokemon-habitat/';
let url_color = 'https://pokeapi.co/api/v2/pokemon-species/';

let id_name = 0;
let id_type = 0;

const div_name = document.getElementById("container_pokemon_name");
const div_type = document.getElementById("container_pokemon_type");
const div_habitat = document.getElementById("container_pokemon_habitat");

document.getElementById('poke_name').addEventListener('input', function () {
    let name = document.getElementById('poke_name').value;

    if (name !== "") {
        document.getElementById('btn1').onclick = loadpk_name;
    } else {
        document.getElementById('btn1').onclick = null;
    }

    function loadpk_name() {
        div_type.style.display = "none";
        div_habitat.style.display = "none";
        div_name.style.display = "block";

        document.getElementById("previous").style.display = "block";
        document.getElementById("next").style.display = "block";

        document.getElementById("previous_t").style.display = "none";
        document.getElementById("next_t").style.display = "none";

        console.log(url_pokemon + name);
        var result = url_pokemon + name;
        var result_color = url_color + name;

        fetch(result)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.clear;
                console.log(data);
                document.getElementById('name_n').innerHTML = data['name'];
                document.getElementById('id_n').innerHTML = "ID: " + data['id'];
                id_name = data['id'];
                console.log('ID: ' + id_name);
                let img = data['sprites']['front_default'];
                document.getElementById('picture_n').setAttribute('src', img);
                document.getElementById('type_n').innerHTML = "Type: " + data['types']['0']['type']['name'];
                document.getElementById('hp_n').innerHTML = "HP: " + data['stats']['0']['base_stat'];
                document.getElementById('attack_n').innerHTML = "Attack: " + data['stats']['1']['base_stat'];
            })
            .catch((erro) => {
                console.log("Erro: " + erro)
            });

        fetch(result_color)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.clear;
                console.log(data);
                document.getElementById('container_pokemon_name').style.backgroundColor = data['color']['name'];
            })
            .catch((erro) => {
                console.log("Erro: " + erro);
            });

        document.getElementById('poke_name').value = "";

    }
});

function loadNextPokemon() {
    console.log(id_name);
    id_name++; // Incrementa o ID para o próximo Pokémon
    div_type.style.display = "none";
    div_habitat.style.display = "none";
    div_name.style.display = "block";

    document.getElementById("previous").style.display = "block";
    document.getElementById("next").style.display = "block";

    document.getElementById("previous_t").style.display = "none";
    document.getElementById("next_t").style.display = "none";

    console.log(url_pokemon + id_name);
    var result = url_pokemon + id_name;
    var result_color = url_color + id_name;

    fetch(result)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.clear;
            console.log(data);
            document.getElementById('name_n').innerHTML = data['name'];
            document.getElementById('id_n').innerHTML = "ID: " + data['id'];
            id_name = data['id'];
            let img = data['sprites']['front_default'];
            document.getElementById('picture_n').setAttribute('src', img);
            document.getElementById('type_n').innerHTML = "Type: " + data['types']['0']['type']['name'];
            document.getElementById('hp_n').innerHTML = "HP: " + data['stats']['0']['base_stat'];
            document.getElementById('attack_n').innerHTML = "Attack: " + data['stats']['1']['base_stat'];
        })
        .catch((erro) => {
            console.log("Erro: " + erro)
        });

    fetch(result_color)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.clear;
            console.log(data);
            document.getElementById('container_pokemon_name').style.backgroundColor = data['color']['name'];
        })
        .catch((erro) => {
            console.log("Erro: " + erro);
        });
}

function loadPreviousPokemon() {
    id_name--; // Incrementa o ID para o próximo Pokémon
    if (id_name <= 0) {
        id_name = 1;
    }
    else {

        div_type.style.display = "none";
        div_habitat.style.display = "none";
        div_name.style.display = "block";

        document.getElementById("previous").style.display = "block";
        document.getElementById("next").style.display = "block";

        document.getElementById("previous_t").style.display = "none";
        document.getElementById("next_t").style.display = "none";

        console.log(url_pokemon + id_name);
        var result = url_pokemon + id_name;
        var result_color = url_color + id_name;

        fetch(result)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.clear;
                console.log(data);
                document.getElementById('name_n').innerHTML = data['name'];
                document.getElementById('id_n').innerHTML = "ID: " + data['id'];
                id_name = data['id'];
                let img = data['sprites']['front_default'];
                document.getElementById('picture_n').setAttribute('src', img);
                document.getElementById('type_n').innerHTML = "Type: " + data['types']['0']['type']['name'];
                document.getElementById('hp_n').innerHTML = "HP: " + data['stats']['0']['base_stat'];
                document.getElementById('attack_n').innerHTML = "Attack: " + data['stats']['1']['base_stat'];
            })
            .catch((erro) => {
                console.log("Erro: " + erro)
            });

        fetch(result_color)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.clear;
                console.log(data);
                document.getElementById('container_pokemon_name').style.backgroundColor = data['color']['name'];
            })
            .catch((erro) => {
                console.log("Erro: " + erro)
            });
    }


}

document.getElementById('poke_type').addEventListener('input', function () {
    let type = document.getElementById('poke_type').value;

    if (type !== "") {
        document.getElementById('btn1').onclick = loadpk_type;
    } else {
        document.getElementById('btn1').onclick = null;
    }

    function loadpk_type() {
        div_name.style.display = "none";
        div_habitat.style.display = "none";
        div_type.style.display = "block";

        document.getElementById("previous").style.display = "none";
        document.getElementById("next").style.display = "none";

        document.getElementById("previous_t").style.display = "block";
        document.getElementById("next_t").style.display = "block";

        const ul = document.getElementById("pokemon_list");
        ul.innerHTML = ""; // Limpa a lista antes de adicionar novos itens

        console.log(url_type + type);
        var result = url_type + type;

        fetch(result)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.clear;
                console.log(data);

                id_type = data['id'];
                console.log(id_type);

                document.getElementById('lista_tipo').innerHTML = "Pokémons do tipo: " + data['name'];

                data.pokemon.forEach((pokemonObj) => {
                    const li = document.createElement("li");
                    li.textContent = pokemonObj.pokemon.name;
                    li.id = `${pokemonObj.pokemon.name}`;

                    li.onclick = function () {
                        console.log("entrou na funçaaaaaaaaaaaaaao");

                        div_type.style.display = "none";
                        div_habitat.style.display = "none";
                        div_name.style.display = "block";

                        document.getElementById("previous").style.display = "block";
                        document.getElementById("next").style.display = "block";

                        document.getElementById("previous_t").style.display = "none";
                        document.getElementById("next_t").style.display = "none";

                        var result2 = url_pokemon + li.id;
                        var result_color2 = url_color + li.id;

                        fetch(result2)
                            .then((response) => {
                                return response.json();
                            })
                            .then((data) => {
                                console.clear;
                                console.log(data);
                                document.getElementById('name_n').innerHTML = data['name'];
                                document.getElementById('id_n').innerHTML = "ID: " + data['id'];
                                id_name = data['id'];
                                console.log('ID: ' + id_name);
                                let img = data['sprites']['front_default'];
                                document.getElementById('picture_n').setAttribute('src', img);
                                document.getElementById('type_n').innerHTML = "Type: " + data['types']['0']['type']['name'];
                                document.getElementById('hp_n').innerHTML = "HP: " + data['stats']['0']['base_stat'];
                                document.getElementById('attack_n').innerHTML = "Attack: " + data['stats']['1']['base_stat'];
                            })
                            .catch((erro) => {
                                console.log("Erro: " + erro)
                            });

                        fetch(result_color2)
                            .then((response) => {
                                return response.json();
                            })
                            .then((data) => {
                                console.clear;
                                console.log(data);
                                document.getElementById('container_pokemon_name').style.backgroundColor = data['color']['name'];
                            })
                            .catch((erro) => {
                                console.log("Erro: " + erro);
                            });

                        document.getElementById('poke_name').value = "";

                    };

                    ul.appendChild(li);

                });
            })
            .catch((erro) => {
                console.log("Erro: " + erro)
            });

        document.getElementById('poke_type').value = "";
    }
});

function loadNextType() {
    id_type++;
    if (id_type >= 19) {
        id_type = 19;
    }

    div_name.style.display = "none";
    div_habitat.style.display = "none";
    div_type.style.display = "block";

    document.getElementById("previous").style.display = "none";
    document.getElementById("next").style.display = "none";

    document.getElementById("previous_t").style.display = "block";
    document.getElementById("next_t").style.display = "block";

    const ul = document.getElementById("pokemon_list");
    ul.innerHTML = ""; // Limpa a lista antes de adicionar novos itens

    console.log(url_type + id_type);
    var result = url_type + id_type;

    fetch(result)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.clear;
            console.log(data);

            id_type = data['id'];
            console.log(id_type);

            document.getElementById('lista_tipo').innerHTML = "Pokémons do tipo: " + data['name'];

            data.pokemon.forEach((pokemonObj) => {
                const li = document.createElement("li");
                li.textContent = pokemonObj.pokemon.name;
                li.id = `${pokemonObj.pokemon.name}`;

                li.onclick = function () {
                    console.log("entrou na funçaaaaaaaaaaaaaao");

                    div_type.style.display = "none";
                    div_habitat.style.display = "none";
                    div_name.style.display = "block";

                    document.getElementById("previous").style.display = "block";
                    document.getElementById("next").style.display = "block";

                    document.getElementById("previous_t").style.display = "none";
                    document.getElementById("next_t").style.display = "none";

                    var result2 = url_pokemon + li.id;
                    var result_color2 = url_color + li.id;

                    fetch(result2)
                        .then((response) => {
                            return response.json();
                        })
                        .then((data) => {
                            console.clear;
                            console.log(data);
                            document.getElementById('name_n').innerHTML = data['name'];
                            document.getElementById('id_n').innerHTML = "ID: " + data['id'];
                            id_name = data['id'];
                            console.log('ID: ' + id_name);
                            let img = data['sprites']['front_default'];
                            document.getElementById('picture_n').setAttribute('src', img);
                            document.getElementById('type_n').innerHTML = "Type: " + data['types']['0']['type']['name'];
                            document.getElementById('hp_n').innerHTML = "HP: " + data['stats']['0']['base_stat'];
                            document.getElementById('attack_n').innerHTML = "Attack: " + data['stats']['1']['base_stat'];
                        })
                        .catch((erro) => {
                            console.log("Erro: " + erro)
                        });

                    fetch(result_color2)
                        .then((response) => {
                            return response.json();
                        })
                        .then((data) => {
                            console.clear;
                            console.log(data);
                            document.getElementById('container_pokemon_name').style.backgroundColor = data['color']['name'];
                        })
                        .catch((erro) => {
                            console.log("Erro: " + erro);
                        });

                    document.getElementById('poke_name').value = "";

                };

                ul.appendChild(li);
            });
        })
        .catch((erro) => {
            console.log("Erro: " + erro)
        });
}

function loadPreviousType() {
    id_type--;
    if (id_type <= 0) {
        id_type = 1;
    }

    div_name.style.display = "none";
    div_habitat.style.display = "none";
    div_type.style.display = "block";

    document.getElementById("previous").style.display = "none";
    document.getElementById("next").style.display = "none";

    document.getElementById("previous_t").style.display = "block";
    document.getElementById("next_t").style.display = "block";

    const ul = document.getElementById("pokemon_list");
    ul.innerHTML = ""; // Limpa a lista antes de adicionar novos itens

    console.log(url_type + id_type);
    var result = url_type + id_type;

    fetch(result)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.clear;
            console.log(data);

            id_type = data['id'];
            console.log(id_type);

            document.getElementById('lista_tipo').innerHTML = "Pokémons do tipo: " + data['name'];

            data.pokemon.forEach((pokemonObj) => {
                const li = document.createElement("li");
                li.textContent = pokemonObj.pokemon.name;
                li.id = `${pokemonObj.pokemon.name}`;

                li.onclick = function () {
                    console.log("entrou na funçaaaaaaaaaaaaaao");

                    div_type.style.display = "none";
                    div_habitat.style.display = "none";
                    div_name.style.display = "block";

                    document.getElementById("previous").style.display = "block";
                    document.getElementById("next").style.display = "block";

                    document.getElementById("previous_t").style.display = "none";
                    document.getElementById("next_t").style.display = "none";

                    var result2 = url_pokemon + li.id;
                    var result_color2 = url_color + li.id;

                    fetch(result2)
                        .then((response) => {
                            return response.json();
                        })
                        .then((data) => {
                            console.clear;
                            console.log(data);
                            document.getElementById('name_n').innerHTML = data['name'];
                            document.getElementById('id_n').innerHTML = "ID: " + data['id'];
                            id_name = data['id'];
                            console.log('ID: ' + id_name);
                            let img = data['sprites']['front_default'];
                            document.getElementById('picture_n').setAttribute('src', img);
                            document.getElementById('type_n').innerHTML = "Type: " + data['types']['0']['type']['name'];
                            document.getElementById('hp_n').innerHTML = "HP: " + data['stats']['0']['base_stat'];
                            document.getElementById('attack_n').innerHTML = "Attack: " + data['stats']['1']['base_stat'];
                        })
                        .catch((erro) => {
                            console.log("Erro: " + erro)
                        });

                    fetch(result_color2)
                        .then((response) => {
                            return response.json();
                        })
                        .then((data) => {
                            console.clear;
                            console.log(data);
                            document.getElementById('container_pokemon_name').style.backgroundColor = data['color']['name'];
                        })
                        .catch((erro) => {
                            console.log("Erro: " + erro);
                        });

                    document.getElementById('poke_name').value = "";

                };

                ul.appendChild(li);
            });
        })
        .catch((erro) => {
            console.log("Erro: " + erro)
        });
}

document.getElementById('poke_habitat').addEventListener('input', function () {
    let habitat = document.getElementById('poke_habitat').value;

    if (habitat !== "") {
        document.getElementById('btn1').onclick = loadpk_habitat;
    } else {
        document.getElementById('btn1').onclick = null;
    }

    function loadpk_habitat() {
        div_name.style.display = "none";
        div_type.style.display = "none";
        div_habitat.style.display = "block";

        console.log(url_habitat + habitat);
        var result = url_habitat + habitat;

        fetch(result)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.clear;
                console.log(data);
            })
            .catch((erro) => {
                console.log("Erro: " + erro)
            });

        document.getElementById('poke_habitat').value = "";
    }
});


// --------------------- chamada dos botões ----------------------------- //

document.getElementById('next').onclick = loadNextPokemon;
document.getElementById('previous').onclick = loadPreviousPokemon;

document.getElementById('next_t').onclick = loadNextType;
document.getElementById('previous_t').onclick = loadPreviousType;