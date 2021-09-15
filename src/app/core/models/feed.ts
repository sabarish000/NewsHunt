export class Feed{
    author:string;
    source: Source;
    title:string;
    description:string;
    url:string;
    urlToImage:string;
    publishedAt: Date;
    content:string;
}

export class Source{
    id: string;
    name : string;
    description?: string;
    country?:string;
    category?:string;
}