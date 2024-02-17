
import { baseApi } from "../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (data) => ({
        url: "/user/register/",
        method: "POST",
        body: data,
      }),
      invalidatesTags:['user']
    }),
    loginUser: builder.mutation({
      query: (data) => ({
        url: "/user/login/",
        method: "POST",
        headers:{
            Authorization :`bearer ${localStorage.getItem("access")}`
        },
        body: data,
      }),
      invalidatesTags:['user']
    }),
    GetUserProfile:builder.query({
      query:(id)=>({
        url:`/user/single/${id}/`,

      }),
      providesTags:['user']
    }),
    GetStudentID:builder.query({
      query:(id)=>({
        url:`/user/student/${id}/`,

      }),
      providesTags:['user']
    }),
    GetCourseList:builder.query({
      query:()=>({
        url:`/user/courses/`,
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("access")}`
        
        }

      }),
      providesTags:['user']
    }),
    EnrolledCourse:builder.mutation({
      query:(data)=>({
        url:`/user/enroll-course/`,
        method:"POST",
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("access")}`
        
        },
        body:data
      }),
      invalidatesTags:['enrolled']
      
    }),
    GetMyEnrolledData:builder.query({
      query:({id})=>({
        url:`/user/student-courses/${id}/`,
       headers:{
        'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("access")}`
       }
      }),
      providesTags:['enrolled']
    }),
    CreateCourse:builder.mutation({
      query:(data)=>({
        url:`/user/courses/`,
        method:"POST",
        headers:{
          'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("access")}`
         },
         body:data
      }),
      invalidatesTags:['course']
    }),
    GetTeacherList:builder.query({
      query:()=>({
        url:"/user/teachers"
      }),
     providesTags:['teacher']
    }),
    GetTeacherApproval:builder.query({
      query:({id})=>({
        url:`/user/approve-teacher/${id}`
      }),
      providesTags:['teacher']
    }),
    CreateCategory:builder.mutation({
      query:(data)=>({
        url:"/user/categories/",
        method:"POST",
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("access")}`
        },
        body:data
      }),
      invalidatesTags:['category']
    }),
    GetAllCategory:builder.query({
     query:()=>({
      url:"/user/categories/",
      headers:{
        'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("access")}`
      }
     }),
     providesTags:['category']
    }),
    EditCategory:builder.mutation({
      query:({id, data})=>({
        url:`/user/categories/${id}/`,
        method:"PUT",
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("access")}`
        },
        body:data
      }),
      invalidatesTags:['category']
    }),
    DeleteCategory:builder.mutation({
      query:({id})=>({
        url:`/user/categories/${id}`,
        method:"DELETE",
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("access")}`
        }
      }),
      invalidatesTags:['category']
    }),
    GetSingleCategory:builder.query({
      query:({id})=>({
        url:`/user/categories/${id}/`,
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("access")}`
        }
      }),
      providesTags:['category']
    }),
    GetAllStudent:builder.query({
      query:()=>({
        url:"/user/students/"
      }),
      providesTags:['user']
    }),
    GetAllTeacher:builder.query({
      query:()=>({
        url:"/user/approved-teachers/"
      }),
      providesTags:['teacher']
    }),
    GetSingleTeacher:builder.query({
      query:(id)=>({
        url:`https://softmaxshop.com/user/teacher/${id}/`
      }),
      providesTags:['teacher']
    }),
    GetTeacherCourse:builder.query({
      query:(id)=>({
        url:`/user/teacher/${id}/courses/`,
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("access")}`
        
        }
      }),
      providesTags:['course']
      
    }),
    TeacherJoin:builder.mutation({
      query:(data)=>({
        url:"/user/teachers/",
        method:"POST",
        body:data
      }),
      invalidatesTags:['teacher']
    })
   
 
    
  }),
});

export const { 
  useCreateUserMutation,
   useLoginUserMutation,
  useGetUserProfileQuery ,
  useGetCourseListQuery,
  useEnrolledCourseMutation,
  useGetMyEnrolledDataQuery,
  useGetStudentIDQuery,
  useGetTeacherListQuery,
  useGetTeacherApprovalQuery,
  useCreateCategoryMutation,
  useGetAllCategoryQuery,
  useEditCategoryMutation,
  useDeleteCategoryMutation,
  useGetSingleCategoryQuery,
  useGetAllStudentQuery,
  useGetAllTeacherQuery,
  useGetSingleTeacherQuery,
  useCreateCourseMutation,
  useGetTeacherCourseQuery,
  useTeacherJoinMutation
  

} = userApi;
