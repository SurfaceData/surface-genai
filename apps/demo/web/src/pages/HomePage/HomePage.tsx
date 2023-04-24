import { Link, routes } from '@redwoodjs/router';
import { MetaTags } from '@redwoodjs/web';

// import TriggerPromptForm from 'src/components/TriggerPromptForm'
import ConversationForm from 'src/components/ConversationForm';

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <ConversationForm />
    </>
  );
};

export default HomePage;
