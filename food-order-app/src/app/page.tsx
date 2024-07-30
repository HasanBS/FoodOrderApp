import Header from "../app/components/layout/Header";
import Hero from "../app/components/layout/Hero";
import HomeMenu from "../app/components/layout/HomeMenu";
import SectionHeaders from './components/layout/SectionHeaders';

export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section className="text-center my-16">
        <SectionHeaders subHeader={'Hikayemiz'} mainHeader={'Hakkımızda'} />
        <div className="max-w-md mx-auto mt-4 text-gray-500 gap-4 flex  flex-col">
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi eligendi et voluptatem reiciendis dolorem, repudiandae numquam fugit harum temporibus eaque, impedit laboriosam totam illum vel mollitia ipsam natus aut consectetur!
          </p>
          <p>
            Sequi eligendi et voluptatem reiciendis dolorem, repudiandae numquam fugit harum temporibus eaque, impedit laboriosam totam illum vel mollitia ipsam natus aut consectetur!
          </p>
          <p>
            Repudiandae numquam fugit harum temporibus eaque, impedit laboriosam totam illum vel mollitia ipsam natus aut consectetur!
          </p>
        </div>
      </section>

      <section className="text-center">
        <SectionHeaders subHeader={'Bize Ulaşın'} mainHeader={'İletişim'} />
        <div className="gap-4 max-w-4xl mx-auto mt-4">
          <div>
            <h3 className="text-primary font-semibold">Adres</h3>
            <p className="text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, quidem.</p>
          </div>
          <div>
            <h3 className="text-primary font-semibold">Telefon</h3>
            <a href="tel:+905555555555" className="text-gray-500">+90 555 555 55 55</a>
          </div>
          <div>
            <h3 className="text-primary font-semibold">E-posta</h3>
            <a href="mailto:contact@hasso.com" className="text-gray-500">contact@hasso.com</a>
          </div>
        </div>
      </section>
    </>
  );
}
