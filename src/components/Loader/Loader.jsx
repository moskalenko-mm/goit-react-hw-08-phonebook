import { Oval } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div
      styles={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vh',
        height: '100vh',
      }}
    >
      <Oval
        height={80}
        width={80}
        color="#fffff"
        wrapperStyle={{}}
        wrapperclassName=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#fffff"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
      ;
    </div>
  );
};

export default Loader;
