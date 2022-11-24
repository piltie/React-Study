// 3 - componente
import * as React from 'react';

interface IProps {
    name?: string
    // O Enum é uma forma interessante de formatar um objeto com chaves e valores, onde podems utilizar como props, passando a chave pela prop, imprimindo o valor dela no componente
    category: Category
}

export enum Category {
    JS = "Javascript",
    TS = "Typescriipt"
}

export default function FirstComponent ({ name, category }: IProps) {
  return (
    <div>
      <h1>meu primeiro comp {name}</h1>
      <h1>Categoria = {category} </h1>
    </div>
  );
}
