# Combustível QM

Registro de abastecimento (data, litros, preço/litro, Arla 32, desconto, forma de pagamento, km) para um veículo, com histórico mensal e relatório exportável (copiar/WhatsApp).

## Arquivo oficial

**`index.html`** é a versão em uso — a única editada desde o upload inicial (Arla 32, desconto, edição de registro, forma de pagamento).

`CONTROLE DE COMBUSTIVEL.html` é a versão anterior, sem essas funções. Ficou no repo mas não recebeu nenhuma atualização depois do upload inicial — não é a versão a abrir/editar.

## Arquitetura — leia antes de confiar dados aqui

- Sem servidor, sem banco de dados. Tudo salvo em `localStorage` do navegador (chave `qm_combustivel_v3`).
- **Risco real:** trocar de celular, limpar cache/dados do navegador ou reinstalar = histórico perdido. O `_bkp` que o app grava fica na mesma origem (mesmo navegador) — não protege contra isso.
- Um veículo por navegador. Apesar do texto "Controle de Frota" na tela, não há campo de veículo/placa — não soma nem separa mais de um carro.
- Sem sincronização entre dispositivos.

## Se for usar para valer (frota de verdade, dado que não pode sumir)

Precisa de backend com banco (mesmo que simples) substituindo o `localStorage`, campo de veículo, e export/backup fora do navegador. Não fiz essa mudança agora porque não foi pedida — registrando aqui pra decisão futura.
