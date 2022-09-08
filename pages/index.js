import Layout from '../components/Layout';
import Characters from './characters';
import axiosClient from '../config/axios';

const Home = ({ characters, data }) => {
	return <Characters characters={characters} />;
};

Home.getLayout = (page) => <Layout>{page}</Layout>;

export default Home;

export async function getServerSideProps() {
	const { data } = await axiosClient(`/characters`);
	const characters = data.data.results;

	return {
		props: {
			data,
			characters,
		},
	};
}
