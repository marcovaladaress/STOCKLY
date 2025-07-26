import Header, {
  HeaderLeft,
  HeaderSubTitle,
  HeaderTitle,
} from "./_components/header";

const Home = () => {
  return (
    <div className="m-8 w-full space-y-8 overflow-auto rounded-lg bg-white p-8">
      <Header>
        <HeaderLeft>
          <HeaderSubTitle>Visão geral dos dados </HeaderSubTitle>
          <HeaderTitle>Dashboard</HeaderTitle>
        </HeaderLeft>
      </Header>
    </div>
  );
};

export default Home;
