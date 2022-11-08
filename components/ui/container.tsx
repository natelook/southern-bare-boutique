const Container: React.FC = ({ children }) => {
  return (
    <div className="bg-white">
      <main className="pt-8 max-w-2xl mx-auto pb-16 px-4 sm:pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
        {children}
      </main>
    </div>
  )
}

export default Container
