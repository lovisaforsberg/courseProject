
// If course is fetched from the course-details API

function getHighestKey(object){
    var max = 0;
    for (var key in object) {
        max = (max < parseFloat(key)) ? parseFloat(key) : max;
    }
    return max.toString()
}

function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

function setSendData(fetchedCourse, sentCourse){

    let courseInfo = {}
        courseInfo.title = fetchedCourse.course.title
        courseInfo.course_code = fetchedCourse.course.courseCode
        courseInfo.size = fetchedCourse.course.credits
        courseInfo.gradeScale = fetchedCourse.course.gradeScaleCode
        courseInfo.department = fetchedCourse.course.department
        courseInfo.subjects = fetchedCourse.mainSubjects
        courseInfo.examiners = fetchedCourse.examiners
        courseInfo.urlSocial = fetchedCourse.socialCoursePageUrl

       // if(fetchedCourse.course.infoContactName !== undefined){
        if('recruitmentText' in fetchedCourse.course){
            courseInfo.about = fetchedCourse.course.recruitmentText
            .replace(/<p>/g, '').replace(/<\/p>/g, '')
            .replace(/<em>/g, '').replace(/<\/em>/g, '')
            .replace(/<ul>/g, '').replace(/<\/ul>/g, '')
            .replace(/<li>/g, '').replace(/<\/li>/g, ', ')
            .replace(/<br \/>/g, ', ')
            .replace(/&#8217;/g, "'")    
        }
        else{
            courseInfo.about = "description missing"
        }

        if('prerequisites' in fetchedCourse.course){
            courseInfo.prerequisites = fetchedCourse.course.prerequisites
            .replace(/<p>/g, '').replace(/<\/p>/g, '')
            .replace(/<em>/g, '').replace(/<\/em>/g, '')
            .replace(/<ul>/g, '').replace(/<\/ul>/g, '')
            .replace(/<li>/g, '').replace(/<\/li>/g, ', ')
            .replace(/<br \/>/g, ', ')
            .replace(/&#8217;/g, "'")    
        }
        else{
            courseInfo.prerequisites = "prerequisites missing"
        }

        courseInfo.contactName = fetchedCourse.course.infoContactName
        courseInfo.supplement_info = fetchedCourse.course.supplementaryInfo

        var highestKey = (getHighestKey(fetchedCourse.examinationSets))
        courseInfo.examinationForm = fetchedCourse.examinationSets[highestKey].examinationRounds
        
        // courseInfo.course.educationalLevelCode
        if('education_level' in sentCourse){
            courseInfo.level = sentCourse.education_level}
        else{courseInfo.level = '-'}

        if('period' in sentCourse){
            courseInfo.givenPeriods = sentCourse.period.filter(onlyUnique); }
        else{courseInfo.givenPeriods = []}

        //
        courseInfo.language = sentCourse.language
        courseInfo.campus = sentCourse.campus
        courseInfo.color = sentCourse.color
        
        // FIND PERIOD INFO
        let periodInfo = []
        let allRounds = []
       // console.log(fetchedCourse)
        fetchedCourse.roundInfos.map(Round =>{
            if (Round.round.campus.name === sentCourse.campus){
                allRounds.push(Round) 
            }
        })
        allRounds.filter(function(item){
        var i = periodInfo.findIndex(x => (x.round.courseRoundTerms[0].formattedPeriodsAndCredits == item.round.courseRoundTerms[0].formattedPeriodsAndCredits));
        if(i <= -1){periodInfo.push(item);}
        return null;
        });
        //console.log(periodInfo)

        // ADD PERIOD INFO TO COURSEINFO
        let rounds = []
        periodInfo.map(round=>{
            let courseRound ={amountLecture: round.lectureCount,
            amountExercise: round.excerciseCount,
            roundResp: round.ldapResponsibles,
            roundTeachers: round.ldapTeachers,
            tutoringTime: round.round.tutoringTimeOfDay,
            periodsDivision: round.round.courseRoundTerms[0].formattedPeriodsAndCredits,
            courseRoundTerms: round.round.courseRoundTerms[0]}
            rounds.push(courseRound)
        })
        courseInfo.periodInfo = rounds
    return courseInfo
}

function setSendDataToStudyPlan(fetchedCourse){

    let courseInfo = {}
        courseInfo.title = fetchedCourse.course.title
        courseInfo.course_code = fetchedCourse.course.courseCode
        courseInfo.size = fetchedCourse.course.credits
        courseInfo.gradeScale = fetchedCourse.course.gradeScaleCode
        courseInfo.department = fetchedCourse.course.department
        courseInfo.subjects = fetchedCourse.mainSubjects
        courseInfo.examiners = fetchedCourse.examiners
        courseInfo.urlSocial = fetchedCourse.socialCoursePageUrl

       // if(fetchedCourse.course.infoContactName !== undefined){
        if('recruitmentText' in fetchedCourse.course){
            courseInfo.about = fetchedCourse.course.recruitmentText
            .replace(/<p>/g, '').replace(/<\/p>/g, '')
            .replace(/<em>/g, '').replace(/<\/em>/g, '')
            .replace(/<ul>/g, '').replace(/<\/ul>/g, '')
            .replace(/<li>/g, '').replace(/<\/li>/g, ', ')
            .replace(/<br \/>/g, ', ')
            .replace(/&#8217;/g, "'")    
        }
        else{
            courseInfo.about = "description missing"
        }

        if('prerequisites' in fetchedCourse.course){
            courseInfo.prerequisites = fetchedCourse.course.prerequisites
            .replace(/<p>/g, '').replace(/<\/p>/g, '')
            .replace(/<em>/g, '').replace(/<\/em>/g, '')
            .replace(/<ul>/g, '').replace(/<\/ul>/g, '')
            .replace(/<li>/g, '').replace(/<\/li>/g, ', ')
            .replace(/<br \/>/g, ', ')
            .replace(/&#8217;/g, "'")    
        }
        else{
            courseInfo.prerequisites = "prerequisites missing"
        }

        courseInfo.contactName = fetchedCourse.course.infoContactName
        courseInfo.supplement_info = fetchedCourse.course.supplementaryInfo

        var highestKey = (getHighestKey(fetchedCourse.examinationSets))
        courseInfo.examinationForm = fetchedCourse.examinationSets[highestKey].examinationRounds
        
        courseInfo.level = fetchedCourse.course.educationalLevelCode

        
    return courseInfo
}

export {setSendData, setSendDataToStudyPlan}