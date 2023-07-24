import GeoGebraAPI from './components/GeoGebraAPI';
import GeogebraApp from './components/GeoGebraAPI';

export default function Home() {
  return (
    <main className='mt-6 flex justify-center items-center'>
      <section className='text-center'>
        <h1 className='text-4xl font-bold '>¡Bienvenido a mathcelo!</h1>
        <p className='text-lg'>
          Un lugar creado para ayudarte a aprender matemáticas.
        </p>
      </section>
    </main>
  );
}
