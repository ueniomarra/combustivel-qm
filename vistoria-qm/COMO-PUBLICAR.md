# Como publicar o Vistoria QM nas lojas

## Pré-requisitos

- Node.js 18+ instalado
- Android Studio (para Google Play)
- Xcode 15+ no macOS (para App Store)
- Conta de desenvolvedor Google Play (US$ 25 única vez)
- Conta de desenvolvedor Apple (US$ 99/ano)

---

## 1. Instalar dependências

```bash
cd vistoria-qm
npm install
```

---

## 2. Android – Google Play

### Gerar o projeto Android

```bash
npx cap add android
npx cap sync
```

### Abrir no Android Studio

```bash
npx cap open android
```

### Gerar keystore (primeira vez apenas)

```bash
keytool -genkey -v \
  -keystore keystore/vistoria-qm.keystore \
  -alias vistoriaqm \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000
```

> Guarde a senha do keystore em local seguro – sem ela não é possível atualizar o app.

### Build de produção no Android Studio

1. **Build → Generate Signed Bundle / APK**
2. Selecione **Android App Bundle (.aab)**
3. Aponte para o keystore criado acima
4. Escolha `release` como build variant
5. O arquivo `.aab` será gerado em `android/app/release/`

### Publicar no Google Play Console

1. Acesse [play.google.com/console](https://play.google.com/console)
2. Crie um novo app → preencha ficha completa
3. Em **Produção → Criar versão**, envie o `.aab`
4. Preencha classificação de conteúdo e política de privacidade
5. Envie para revisão (geralmente 1–3 dias)

---

## 3. iOS – App Store

> Requer macOS com Xcode instalado.

### Gerar o projeto iOS

```bash
npx cap add ios
npx cap sync
```

### Abrir no Xcode

```bash
npx cap open ios
```

### Configurar assinatura no Xcode

1. Selecione o target `App`
2. Em **Signing & Capabilities**, selecione seu Team
3. O Bundle Identifier deve ser `br.com.queirozmarra.vistoria`

### Gerar arquivo para distribuição

1. **Product → Archive**
2. Após o archive, clique em **Distribute App → App Store Connect**
3. Siga o assistente e envie para a App Store Connect

### Publicar na App Store Connect

1. Acesse [appstoreconnect.apple.com](https://appstoreconnect.apple.com)
2. Crie novo app com Bundle ID `br.com.queirozmarra.vistoria`
3. Preencha metadados, capturas de tela e descrição
4. Selecione o build enviado e submeta para revisão (geralmente 1–2 dias)

---

## 4. Ícones e splash screen

Coloque os ícones PNG em `www/icons/`:

| Arquivo | Tamanho |
|---------|---------|
| icon-72.png | 72×72 |
| icon-96.png | 96×96 |
| icon-128.png | 128×128 |
| icon-144.png | 144×144 |
| icon-152.png | 152×152 |
| icon-192.png | 192×192 |
| icon-384.png | 384×384 |
| icon-512.png | 512×512 |

Recursos nativos Android ficam em `android-resources/`. Para geração automática de ícones Android/iOS use:

```bash
npm install -g @capacitor/assets
npx capacitor-assets generate
```

---

## 5. Atualizar o app após publicação

```bash
# Após modificar arquivos em www/
npx cap sync

# Depois gere novo build assinado no Android Studio / Xcode
```

---

## Informações do app

- **App ID**: `br.com.queirozmarra.vistoria`
- **Nome**: Vistoria QM
- **Versão**: 1.0.0
- **Firebase projeto**: `queiroz-marra-vistorias-b5b6d`
