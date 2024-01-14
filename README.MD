# Projeto de estudos sobre DDD (Domain-Driven Design)

## DDD
Muito resumidamente, baseado em converter o problema do cliente em algo pautável

### Possui os principais tópicos:

- Modelagem do Domínio: Desenvolver uma representação do domínio do negócio que seja compreensível tanto para os desenvolvedores quanto para os especialistas no domínio (aqueles que tem contado direto com as regras de negócio).

- Linguagem Ubíqua: Criar uma linguagem comum que seja compartilhada entre desenvolvedores e especialistas no domínio, garantindo uma compreensão consistente dos conceitos do sistema.

- Contexto Delimitado: Definir limites claros para diferentes partes do sistema, garantindo que os modelos sejam consistentes dentro desses limites, mas permitindo variação entre diferentes contextos.

- Agregados, entidades e Objetos de Valor: Utilizar conceitos como agregados, entidades e objetos de valor para modelar de forma mais precisa as relações e comportamentos no domínio.

- Serviços e Módulos: Identificar serviços e módulos no sistema que encapsulem funcionalidades específicas relacionadas ao domínio.

## Desafio do projeto:
- Um professor tem dificuldade em saber a dúvida dos alunos
- Tem que responder os alunos e se perde em quais dúvidas já foram respondidas

## Visualização:

```
src
├─ core
│  ├─ entities        # códigos reutilizáveis principais
|  └─ types           # tipos reutilizáveis principais
├─ domain 
|  └─ forum           # nome de um subdomínio da aplicação
│  |  ├─ application  # regras de negócio da APLICAÇÃO
|  |  └─ enterprise   # regras de negócio da EMPRESA
├─ test
│  ├─ factories       # criação de entidade flexível (SOMENTE para testes)
│  └─ repositories    # repositórios de teste
```