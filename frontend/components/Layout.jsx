import { DefaultSeo } from 'next-seo';
import NavBar from './NavBar';
import Footer from './Footer';

const Layout = ({children}) => {
  return (
    <>
    <DefaultSeo 
    title="Simple next js blog"
    description="Simple Next js and django blog"
    />
      <NavBar/>
      <div id="main">
        {children}
      </div>
      <Footer/>
    </>
  );
}
 
export default Layout;