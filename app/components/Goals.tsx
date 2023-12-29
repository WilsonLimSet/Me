"use client";
import { Table, Thead, Tbody, Tr, Th, Td, Box } from "@chakra-ui/react";
import { useState } from "react";

// Sample data for goals, you can fetch this from an API or your state management
const initialGoals = {
  mind: [
    { goal: "Volunteer 100 hours", status: "ongoing" },
    { goal: "Learn to play an instrument", status: "ongoing" },
    { goal: "Volunteer 100 hours", status: "ongoing" },
    { goal: "Learn to play an instrument", status: "ongoing" },
    { goal: "Volunteer 100 hours", status: "ongoing" },
  ],
  body: [
    { goal: "Volunteer 100 hours", status: "ongoing" },
    { goal: "Learn to play an instrument", status: "ongoing" },
    { goal: "Volunteer 100 hours", status: "ongoing" },
    { goal: "Learn to play an instrument", status: "ongoing" },
    { goal: "Volunteer 100 hours", status: "ongoing" },
  ],
  soul: [
    { goal: "Volunteer 100 hours", status: "ongoing" },
    { goal: "Learn to play an instrument", status: "ongoing" },
    { goal: "Volunteer 100 hours", status: "ongoing" },
    { goal: "Learn to play an instrument", status: "ongoing" },
    { goal: "Volunteer 100 hours", status: "ongoing" },
  ],
  mainQuest: [
    { goal: "Volunteer 100 hours", status: "ongoing" },
    { goal: "Learn to play an instrument", status: "ongoing" },
    { goal: "Volunteer 100 hours", status: "ongoing" },
    { goal: "Learn to play an instrument", status: "ongoing" },
    { goal: "Volunteer 100 hours", status: "ongoing" },
  ],
  sideQuest: [
    { goal: "Volunteer 100 hours", status: "ongoing" },
    { goal: "Learn to play an instrument", status: "ongoing" },
    { goal: "Volunteer 100 hours", status: "ongoing" },
    { goal: "Learn to play an instrument", status: "ongoing" },
    { goal: "Volunteer 100 hours", status: "ongoing" },
  ],
  // ... other categories
};

const GoalTable = () => {
  const [goals, setGoals] = useState(initialGoals);

  const getStatusStyles = (status) => {
    switch (status) {
      case "ongoing":
        return {
          bg: "green.100",
          color: "green.800",
        };
      case "complete":
        return {
          textDecoration: "line-through",
          color: "gray.400",
        };
      default:
        return {};
    }
  };

  return (
    <Table variant="striped" colorScheme="teal" size="sm">
      <Thead>
        <Tr>
          <Th isNumeric>Mind</Th>
          <Th isNumeric>Body</Th>
          <Th isNumeric>Soul</Th>
          <Th isNumeric>Main Quest</Th>
          <Th isNumeric>Side Quest</Th>
        </Tr>
      </Thead>
      <Tbody>
        {Array.from({ length: 5 }).map((_, rowIndex) => (
          <Tr key={rowIndex}>
            {Object.keys(goals).map((category, columnIndex) => {
              const goal = goals[category][rowIndex];
              return (
                <Td key={columnIndex} {...getStatusStyles(goal.status)}>
                  {goal.goal}
                </Td>
              );
            })}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default GoalTable;
