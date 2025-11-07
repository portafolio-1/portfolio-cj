# 🎨 Portafolio Web Profesional

Un portafolio moderno y creativo desarrollado con React, TypeScript y Tailwind CSS, que combina profesionalismo con personalidad única.

## ✨ Características Destacadas

- 🎯 **Diseño Moderno**: Interfaz elegante con efectos glassmorphism y gradientes
- 🚀 **Animaciones Avanzadas**: Transiciones suaves con Framer Motion
- 📱 **Completamente Responsive**: Perfecto en todos los dispositivos
- 🌟 **Sección Personal Única**: "Quién soy fuera del código" para mostrar personalidad
- 💼 **Sistema de Contacto Avanzado**: Modal personalizado y botón flotante
- ⚡ **Optimizado para Rendimiento**: Build ligero y carga rápida
- 🎨 **Paleta de Colores Profesional**: Cyan (#0EA5E9) y Violet (#8B5CF6)

## 🛠️ Tecnologías y Herramientas

### Frontend Framework
- **React 19.1.1** - Biblioteca principal de UI
- **TypeScript** - Tipado estático para mayor robustez
- **Vite 7.2.1** - Build tool rápido y moderno

### Styling y UI
- **Tailwind CSS 3.4.18** - Framework CSS utilitario
- **Framer Motion 12.23.24** - Animaciones avanzadas
- **Lucide React** - Iconografía moderna y consistente
- **CSS Custom Properties** - Variables personalizadas para temas

### Herramientas de Desarrollo
- **ESLint** - Linting y calidad de código
- **PostCSS** - Procesamiento avanzado de CSS
- **TypeScript ESLint** - Reglas específicas para TypeScript
- **Autoprefixer** - Compatibilidad cross-browser automática

## 🏗️ Arquitectura del Proyecto

```
src/
├── App.tsx                      # Componente principal
├── main.tsx                     # Entry point
├── index.css                    # Estilos globales y variables
├── components/
│   ├── sections/               # Secciones del portafolio
│   │   ├── CreativeHeroSection.tsx    # Hero con animaciones
│   │   ├── AboutSection.tsx           # Información profesional
│   │   ├── PersonalSection.tsx        # Personalidad única
│   │   ├── ExperienceSection.tsx      # Timeline de experiencia
│   │   ├── ProjectsSection.tsx        # Proyectos destacados
│   │   ├── ContactSection.tsx         # Información de contacto
│   │   └── Navbar.tsx                 # Navegación principal
│   └── ui/                     # Componentes UI reutilizables
│       ├── ContactModal.tsx           # Modal de contacto
│       ├── FloatingContact.tsx        # Botón flotante
│       ├── ScrollProgress.tsx         # Barra de progreso
│       └── ThemeToggle.tsx            # Cambio de tema
├── context/
│   └── PortfolioContext.tsx    # Estado global de la aplicación
└── hooks/
    └── useAdvancedEffects.ts    # Hooks personalizados
```

## 🎨 Características de Diseño

### Sistema de Colores
- **Primario**: Cyan (#0EA5E9) - Profesional y moderno
- **Secundario**: Violet (#8B5CF6) - Creativo y elegante
- **Backgrounds**: Slate oscuro (#0F172A, #1E293B)
- **Texto**: Slate claro (#F1F5F9) con variantes

### Efectos Visuales
- **Glassmorphism**: Cards con efectos de cristal
- **Gradientes Dinámicos**: Fondos animados
- **Parallax Scrolling**: Elementos flotantes
- **Micro-interacciones**: Hover effects y transiciones

### Tipografía
- **Inter**: Texto principal y párrafos
- **Poppins**: Títulos y encabezados
- **Jerarquía Visual**: Pesos y tamaños optimizados

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone [URL_DEL_REPOSITORIO]
cd react-portafolio
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar en desarrollo**
```bash
npm run dev
```

4. **Build para producción**
```bash
npm run build
```

5. **Preview del build**
```bash
npm run preview
```

## 📦 Scripts Disponibles

- `npm run dev` - Servidor de desarrollo con HMR
- `npm run build` - Build optimizado para producción
- `npm run preview` - Preview del build de producción
- `npm run lint` - Análisis de código con ESLint

## 🎯 Secciones del Portafolio

### 1. **Creative Hero Section**
- Texto rotativo con frases impactantes
- Elementos flotantes animados
- CTAs estratégicos (Ver trabajo, Contacto, CV)
- Efectos parallax personalizados

### 2. **Sobre Mí**
- Información profesional concisa
- Skills grid con iconografía
- Stats y métricas relevantes
- Diseño limpio y profesional

### 3. **Quién Soy Fuera del Código** ⭐
- Personalidad única y auténtica
- Datos curiosos y hobbies
- Timeline personal divertido
- Diferenciación de otros portafolios

### 4. **Experiencia**
- Timeline vertical interactivo
- Detalles de roles y logros
- Tecnologías utilizadas
- Animaciones al scroll

### 5. **Proyectos**
- Grid responsive de proyectos
- Filtros por tecnología
- Links a demos y repositorios
- Cards con efectos hover

### 6. **Contacto**
- Modal personalizado
- Formulario completo con validaciones
- Información de contacto
- Botón flotante expandible

## 🔧 Personalización

### Cambiar Colores
Edita las variables CSS en `src/index.css`:
```css
:root {
  --color-primary-500: #0EA5E9;    /* Cyan principal */
  --color-secondary-500: #8B5CF6;   /* Violet secundario */
  --color-bg-primary: #0F172A;      /* Background oscuro */
}
```

### Modificar Contenido
- **Datos personales**: `src/components/sections/PersonalSection.tsx`
- **Experiencia**: `src/components/sections/ExperienceSection.tsx`
- **Proyectos**: `src/components/sections/ProjectsSection.tsx`
- **Información de contacto**: `src/components/ui/ContactModal.tsx`

### Añadir Nuevas Secciones
1. Crear componente en `src/components/sections/`
2. Importar en `src/App.tsx`
3. Añadir al navbar en `src/components/sections/Navbar.tsx`

## 📊 Optimizaciones de Rendimiento

- **Bundle Size**: ~388KB (optimizado)
- **CSS**: ~40KB (purged y minificado)
- **Lazy Loading**: Componentes bajo demanda
- **Tree Shaking**: Eliminación de código no utilizado
- **Compresión**: Gzip habilitado

## 🌟 Próximas Mejoras

- [ ] Modo claro/oscuro automático
- [ ] Internacionalización (i18n)
- [ ] Blog integrado
- [ ] Métricas de analytics
- [ ] PWA capabilities
- [ ] Tests automatizados

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 👨‍💻 Autor

**Tu Nombre**
- GitHub: [@tu-username](https://github.com/tu-username)
- LinkedIn: [Tu Perfil](https://linkedin.com/in/tu-perfil)
- Email: tu.email@dominio.com

---

⚡ **Desarrollado con pasión usando React, TypeScript y mucho café** ☕
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
