import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { BarChart, LineChart } from 'react-native-chart-kit';


const WelcomeScreen = () => {
  
  const screenWidth = Dimensions.get("window").width;
  const chartWidth = (screenWidth - 60) / 2;
  const chartHeight = 180;

  const barChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        // تغيير اللون للمخطط داخل barChartData
        color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`, // اللون الأحمر
        // يمكن إضافة المزيد من الألوان إذا كان لديك أكثر من مجموعة بيانات
      },
    ],
  };

  const lineChartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri",],
    datasets: [
      {
        data: [50, 90, 60, 80, 70],
        strokeWidth: 2,
        color: (opacity = 1) => `rgba(54, 162, 235, ${opacity})`, // اللون الأزرق
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    color: (opacity = 1) => `rgba(32, 49, 101, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 20,
    barPercentage: 0.8,
    decimalPlaces: 0,
    xAxisLabelSpacing: 15,
    labelRotation: 45,
  };

  return (
    <View style={styles.container}>
      <Text style={styles.test}>Test:</Text>
      <View style={styles.overlay}>
        <View style={styles.row}>
          <BarChart
            data={barChartData}
            width={chartWidth}
            height={chartHeight}
            chartConfig={chartConfig}
            style={styles.chart}
          />
          <LineChart
            data={lineChartData}
            width={chartWidth}
            height={chartHeight}
            chartConfig={chartConfig}
            style={styles.chart}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    alignItems: "center",
    borderColor: "#203165",
    borderWidth: 1,
    borderRadius: 15,
    height: 200,
    justifyContent: "center",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    top:15
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  chart: {
    borderRadius: 12,
    backgroundColor: "#FAFAFA",
    padding: 5,
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    padingleft:10
  },
  test: {
    fontSize: 26,
    color: "#203165",
    fontWeight: "bold",
    marginBottom: 5,
    letterSpacing: 1,
    top:20
  },
});

export default WelcomeScreen;
