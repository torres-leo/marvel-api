import Banner from '../Banner';
import image1 from '/assets/img/229965.jpg';
import image2 from '/assets/img/Marvel-wallpaper.jpg';
import image3 from '/assets/img/94668.jpg';

const Header = () => {
	return (
		<header className='Header'>
			<Banner image1={image1} image2={image2} image3={image3} />
		</header>
	);
};

export default Header;
