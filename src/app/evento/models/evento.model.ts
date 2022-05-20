export class Prevent {
    id: number; // ID tipo evento
    site: Site;
    catering: Catering;
    group: Age;
    music: Music;
    entertainment: Entertainment;
    value: number;
    type: string; // nombre tipo evento
    urlBase: string;
    image: string;
    drinks: Drinks;
}

export class Age {
    id: number;
    items: string;
}

export class Catering {
    id: number;
    items: string;
    value: number;
    urlBase: string;
    image: string;
    description: string;
    description2: string;
}

export class Site {
    id: number;
    site: string;
    address: string;
    capacity: number;
    value: number;
    urlBase: string;
    image: string;
}

export class Music {
    id: number;
    items: string;
    value: number;
    urlBase: string;
    image: string;
    description: string;
    description2: string;
}

export class Entertainment {
    id: number;
    items: string;
    value: number;
}

export class Drinks {
    id: number;
    items: string;
    value: number;
    urlBase: string;
    image: string;
    description: string;
    description2: string;
}

//clases para uso posterior
export class Customer {
    event: Event;
    name: string;
    last_name: string;
    email: string;
    rut: string;
    phone: string;
    address: string;
    city: string;
}
