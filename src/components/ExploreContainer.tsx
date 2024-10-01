import CardsPage from '../pages/cards/CardsPage';
import Collection from '../pages/collection/Collection';

import Home from '../pages/home/Home';
import './ExploreContainer.css';

interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {

  const renderContent = () => {
    switch (name) {
      case 'Home':
        return <Home/>;
      case 'Cards':
        return <CardsPage/>;
      case 'Collection':
        return <Collection/>;
      default:
        return <div>Page Not Found</div>;
    }
  };

  return (
    <div id="container">
      {renderContent()}
    </div> 
  );
};

export default ExploreContainer;
