# Combustível QM

App de controle de abastecimento para **vários veículos**, com **login** e dados salvos num **banco na nuvem** (não mais no navegador). Registro de data, litros, preço/litro, Arla 32, desconto, forma de pagamento e km; histórico mensal, relatório e backup em arquivo.

## Arquivo

`index.html` — app completo, arquivo único (HTML + CSS + JS). Frontend estático; back-end é o Supabase.

## Arquitetura

- **Auth:** Supabase Auth (e-mail/senha). Cada usuário só enxerga os próprios dados.
- **Banco:** Postgres no Supabase, projeto `elo-qm` (organização Queiroz Marra), tabelas `combustivel_vehicles` e `combustivel_records`, isoladas por `Row Level Security` (`auth.uid() = user_id`, cobre select/insert/update/delete).
- **Multi-veículo:** cadastrar, editar, ativar/desativar; seletor de veículo em Abastecer, e filtro por veículo ou "todos" em Histórico e Relatório.
- **Backup fora da nuvem:** botão em Config baixa um `.json` com todos os veículos e registros; outro botão restaura de um `.json` (importa como novos, não sobrescreve).
- Bibliotecas via CDN (`@supabase/supabase-js`, fontes Google). A `anon key` fica no HTML — isso é o padrão do Supabase (chave pública; quem protege os dados é o RLS).

## Como funciona pro usuário

1. Abrir o link → criar conta (e-mail + senha) → **confirmar o e-mail** (Supabase manda um link).
2. Cadastrar ao menos um veículo (o botão de registrar fica travado até ter um).
3. Registrar abastecimentos; ver histórico e relatório por veículo ou somando todos.

## Limitações honestas (o que ainda depende de ajuste manual)

- **Confirmação de e-mail:** por padrão o Supabase exige confirmar o e-mail antes do primeiro login. Se preferir login imediato, é uma opção a desligar no painel do Supabase (Authentication → Providers → Email → desmarcar "Confirm email").
- **Projeto compartilhado:** o combustível foi colocado dentro do projeto Supabase `elo-qm` (que roda outro sistema) porque o limite de projetos grátis (2) já estava atingido. As tabelas são separadas e com RLS, então não se misturam; para isolamento total seria preciso um projeto Supabase próprio.
- **Deploy x repositório:** o deploy na Vercel foi por envio direto de arquivo, não ligado a este repositório. Ou seja, um `git push` aqui **não** atualiza o site automaticamente ainda — para isso, ligar o projeto Vercel a este repo no painel da Vercel.
