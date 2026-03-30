// src/data/mockData.js

export const mockCollegeData = {
  overallCollegeStats: {
    totalStudents: 1250,
    averagePerformanceLevel: "82%",
    totalAssessmentsCompleted: 4500,
    topStrengths: ["Algorithms", "Database Design", "System Architecture"],
    areasToImprove: ["Cloud Deployment", "Advanced React"]
  },
  departments: [
    {
      id: "dept-1",
      name: "Computer Science",
      stats: { totalStudents: 450, avgScore: "85%", completedAssessments: 1200 },
      years: [
        {
          id: "cs-yr-1",
          name: "1st Year",
          mentors: [
            {
              id: "ment-1",
              name: "Mentor Davis",
              students: [
                { id: "stu-1", name: "Student Alex", email: "student@college.edu", score: "88%", performance: "Excellent", feedback: "Great grasps of fundamentals.", roadmap: "Intro to Programming", strengths: ["Python Syntax", "Logic"], weaknesses: ["Time Management"] },
                { id: "stu-2", name: "Student Blake", email: "blake@college.edu", score: "72%", performance: "Average", feedback: "Needs more practice on loops.", roadmap: "Intro to Programming", strengths: ["Basic math"], weaknesses: ["Loops", "Arrays"] }
              ]
            }
          ]
        },
        {
          id: "cs-yr-2",
          name: "2nd Year",
          mentors: [
            {
              id: "ment-2",
              name: "Mentor Sarah",
              students: [
                { id: "stu-3", name: "Student Chloe", email: "chloe@college.edu", score: "93%", performance: "Outstanding", feedback: "Ready for advanced subjects.", roadmap: "Data Structures", strengths: ["Trees", "Sorting"], weaknesses: ["Graphs"] }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "dept-2",
      name: "Information Technology",
      stats: { totalStudents: 320, avgScore: "78%", completedAssessments: 950 },
      years: [
        {
          id: "it-yr-3",
          name: "3rd Year",
          mentors: [
            {
              id: "ment-3",
              name: "Mentor Tom",
              students: [
                { id: "stu-4", name: "Student Derek", email: "derek@college.edu", score: "81%", performance: "Good", feedback: "Consistent performer.", roadmap: "Web Dev BootCamp", strengths: ["HTML", "CSS"], weaknesses: ["React State"] }
              ]
            }
          ]
        }
      ]
    }
  ]
};

export const findDepartmentData = (deptName) => {
  return mockCollegeData.departments.find(d => d.name === deptName) || mockCollegeData.departments[0];
};

export const findMentorData = (mentorName) => {
  for (const dept of mockCollegeData.departments) {
    for (const year of dept.years) {
      for (const mentor of year.mentors) {
        if (mentor.name.includes(mentorName) || mentorName.includes(mentor.name.split(' ')[1])) return mentor;
      }
    }
  }
  return mockCollegeData.departments[0].years[0].mentors[0];
};

export const getStudentData = (studentEmail) => {
  for (const dept of mockCollegeData.departments) {
    for (const year of dept.years) {
      for (const mentor of year.mentors) {
        for (const student of mentor.students) {
           if (student.email === studentEmail || studentEmail.includes('student')) return student;
        }
      }
    }
  }
  return mockCollegeData.departments[0].years[0].mentors[0].students[0];
};
