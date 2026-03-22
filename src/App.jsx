import './index.css';
import './App.css';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CardGallery from './components/CardGallery';
import BookDrive from './components/BookDrive';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Loader />
      <Navbar />
      <main>
        <Hero />
        <CardGallery />
        <BookDrive />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
