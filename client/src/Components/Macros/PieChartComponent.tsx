
import { Cell, Legend, Pie, PieChart as RePieChart } from "recharts";
import { useMacros } from "../../hooks/useMacros";

const COLORS: string[] = ["#0088FE", "#00C49F", "#FFBB28"];

const PieChartComponent: React.FC = () => {
  const { macros, loading, err } = useMacros();
  

  if (loading) return <p>Loading...</p>;
  if (err) return <p className="text-red-500">{err}</p>;


  const today = new Date().toISOString().slice(0, 10); 

  const todayMacros = macros.filter((macro) => {
    if(!macro.createdAt) {
      return false;
    }
    const macroDate = macro.createdAt.slice(0, 10); 
    return macroDate === today;
  });

  const totalProtein = todayMacros.reduce((sum, macro) => sum + macro.protein, 0);
  const totalCarbs = todayMacros.reduce((sum, macro) => sum + macro.carbs, 0);
  const totalFat = todayMacros.reduce((sum, macro) => sum + macro.fat, 0);

  const isEmpty = totalProtein === 0 && totalCarbs === 0 && totalFat === 0;

  const pieData = [
    { name: "Protein", value: totalProtein },
    { name: "Carbs", value: totalCarbs },
    { name: "Fat", value: totalFat },
  ];

  return (
    <div className="flex flex-col items-center text-white">
      {isEmpty ? (
        <p className="text-gray-400 text-lg mt-8">No data available for this date 🫠</p>
      ) : (
        <RePieChart width={300} height={250}>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {pieData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend />
        </RePieChart>
      )}
    </div>
  );
};

export default PieChartComponent;
