import Footer from './_components/Footer';
import Navbar from './_components/Navbar';

const RootLayout = ({ children }) => {
    return (
        <div>
            <Navbar />
            {children}
            <Footer />
        </div>
    );
};

export default RootLayout;
