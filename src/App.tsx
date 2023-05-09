import NumberSearch from "./components/NumberSearch";

function App() {
  return (
    <>
      <div className="w-full">
        <div className="md:w-[50%] w-full px-4 mx-auto mb-10 mt-6">
          <h1 className="md:text-[30px] text-[20px] font-bold text-center">
          Telephone Number Insight including Validity, SPAM, Reputation,and Geographic Information
          </h1>
          <NumberSearch />
        </div>
      </div>
    </>
  );
}

export default App;
