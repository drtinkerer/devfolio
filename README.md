# Modern Developer Portfolio

A sleek, interactive, and modern portfolio website built with Next.js, Tailwind CSS, and Framer Motion and Vibe Coding using Cursor.

## 🌟 Latest Enhancements

This is an enhanced version of the original portfolio template. New features include:

- Dynamic floating icons with interactive animations and icons to be updated as per your personality that you want to show off
- Support for Credly badges iframe embedding 
- Smooth animations and transitions throughout
- Auto-loading SVG icons from floating-icons directory
- Circuit pattern background with animated elements

## 🙏 Credits

This project is based on the excellent work by [Atzin Escandia](https://github.com/atzinescandia). Original repository: [atzin-escandia-devfolio](https://github.com/atzinescandia/atzin-escandia-devfolio)

## 🚀 Getting Started

1. Clone this repository
```bash
git clone <your-repo-url>
```

2. Install dependencies
```bash
yarn install
```

3. Run the development server
```bash
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🎨 Customization

### Adding Your Own Tech Icons
1. Place your SVG icons in the `public/floating-icons` directory
2. The icons will be automatically loaded and displayed in the background
3. Icons will inherit the floating animation and click interactions

### Modifying Colors
The color scheme can be customized in the `tailwind.config.js` file:
```js
theme: {
  extend: {
    colors: {
      electricBlue: {...},
      circuitGreen: {...},
      steelGray: {...},
      brushedAluminum: {...}
    }
  }
}
```

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](issues).

## 💫 Show your support

Give a ⭐️ if you like this project!
