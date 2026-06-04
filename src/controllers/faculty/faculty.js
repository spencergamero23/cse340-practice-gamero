import { getFacultyBySlug, getSortedFaculty } from "../../models/faculty/faculty.js";

export const facultyListPage = async (req,res) => {
    
    const sortBy = req.query.sort || 'department';

    const faculty = await getSortedFaculty(sortBy);


    res.render('faculty/list', {
        title: 'Faculty Directory',
        faculty,
        currentSort: sortBy
    });
};

export const facultyDetailPage = async (req,res,next) =>{
    const facultySlug = req.params.facultySlug;
    const faculty = await getFacultyBySlug(facultySlug);

    if (!faculty){
        const err = new Error(`Faculty ${facultySlug} not found`);
        err.status = 404;
        return next(err);
    }
    console.log("Requested slug:", facultySlug);
            res.render('faculty/detail', {
        title: `${faculty.name} - ${faculty.office}`,
        faculty: faculty
    });
};
