class Pokemon {
    constructor(id, name, types, img, abilities = [],height, weight,moves,stats) {
        this.id = id;
        this.name = name.charAt(0).toUpperCase() + name.slice(1);
        this.types = {
            'slot1':types[0].charAt(0).toUpperCase() + types[0].slice(1),
            'slot2':types[1] == undefined ? null : types[1].charAt(0).toUpperCase() + types[1].slice(1),
        };
        this.img = img;
        this.abilities = abilities;
        this.height,this.weight = height,weight;
        this.moves = moves;
        this.stats = stats;
        
    }
    injectToHTML(){
        return `
        <div class="pokemon-data ${this.types.slot1} ">
            <div class="title-data">
                <h3>${this.name}</h3>
                <h4># ${this.id}</h4>
            </div>
            <div class="row-data">
                <ul>
                    <li class="${this.types.slot1}Type">${this.types.slot1}</li>
                    ${!this.types.slot2 ? '' : `<li class="${this.types.slot1}Type">${this.types.slot2}</li>` }
                </ul>
                <img src=${this.img} alt="" class="logo-pokemon ${this.types.slot1}Type">
            </div>
        </div>

        `
    }



}
export default Pokemon;