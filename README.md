# 3D Gallery

![3D Gallery Preview](https://i.ibb.co/twnfF0z4/Screenshot-2.png)

An interactive 3D gallery built with Three.js, showcasing artworks in a circular arrangement with smooth navigation and realistic effects.

## Live Demo

Check out the live version of the gallery here:  
[https://threedgallery.netlify.app/](https://threedgallery.netlify.app/)

## Features

- **Interactive 3D Environment**: Navigate through the gallery in a circular layout using arrows.
- **Smooth Animations**: Powered by Tween.js for natural transitions.
- **Reflective Floor**: A mirrored floor adds depth and realism.
- **Dynamic Lighting**: A spotlight highlights each artwork, creating a gallery atmosphere.
- **Responsive Design**: Adapts to different screen sizes.
- **Easy Navigation**: Clickable arrows to switch between artworks.

## Technologies Used

- [Three.js](https://threejs.org/) – JavaScript library for 3D graphics.
- [Tween.js](https://github.com/tweenjs/tween.js) – Animation library for smooth transitions.
- [Vite](https://vitejs.dev/) – Fast build tool and development server.
- HTML5, CSS3, JavaScript (ES6+)

## Installation

To run the project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/3d-gallery.git
   cd 3d-gallery
   ```

2. **Install dependencies**:  
   Make sure you have Node.js installed, then run:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:  
   Navigate to `http://localhost:5173` to view the gallery.

## Usage

- **Navigation**: Use the left and right arrows on the screen to browse through the artworks.
- **Viewing**: The title and artist of each artwork update dynamically as you navigate.
- **Responsiveness**: The gallery works well on both desktop and mobile devices.

## Project Structure

```
3d-gallery/
├── index.html          # Main HTML file
├── main.js             # Main JavaScript file with Three.js logic
├── style.css           # CSS styles
├── constants.js        # Constants for images, titles, and artists
├── left.png            # Left arrow image
├── right.png           # Right arrow image
├── package.json        # Project dependencies and scripts
```