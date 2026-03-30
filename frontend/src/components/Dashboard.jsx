const Dashboard = () => {
  return (
    <div className="bg-gray-800 p-4 rounded-xl">
      <h2 className="text-lg font-bold mb-3">📊 Performance</h2>

      <div className="space-y-2">
        <p>Accuracy: 80%</p>
        <p>Weak Area: Division</p>
        <p>Strong Area: Multiplication</p>
      </div>
    </div>
  );
};

export default Dashboard;