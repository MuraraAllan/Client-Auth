const {MongoClient} = require('mongodb');
const MONGO_URL = 'mongodb://localhost:27017/LambdaStudents';
module.exports = async () => {
  const db = await MongoClient.connect(MONGO_URL);
  return {
		Sprints: db.collection('Sprints'),
		Projects: db.collection('Projects'),
		Topics: db.collection('Topics'),
    Students: db.collection('Students'),
    Lectures: db.collection('Lectures'),
    Solutions: db.collection('Solutions'),
    Videos: db.collection('Videos'),
    Questions: db.collection('Questions'),
    Cohorts: db.collection('Cohort'),
    Teachers: db.collection('Teacher'),
    Polls: db.collection('Polls'),
    PollAnswers: db.collection('PollAnswers'),
	};
}
