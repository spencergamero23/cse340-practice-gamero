import { getAllFaculty, getFacultyById, getSortedFaculty } from "../../models/faculty/faculty.js";

export const facultyListPage = (req,res) => {
    
    const sortBy = req.query.sort || 'department';

    const faculty = getSortedFaculty(sortBy);

    res.render('faculty/list', {
        title: 'Faculty Page',
        faculty,
        currentSort: sortBy
    });
};

export const facultyDetailPage = (req,res,next) =>{
    const facultyId = req.params.facultyId;
    const faculty = getFacultyById(facultyId);

    if (!faculty){
        const err = new Error(`Faculty ${facultyId} not found`);
        err.status = 404;
        return next(err);
    }

            res.render('faculty/detail', {
        title: `${faculty.department} - ${faculty.office}`,
        faculty
    });
};
