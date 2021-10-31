import bcrypt from 'bcryptjs'
const users=[
  {
      name:'admin user',
      email:'admin@example.com',
      password:bcrypt.hashSync('123456',10),
      isAdmin:true,

  },
  {
    name:'odelia melloul',
    email:'odelia@example.com',
    password:bcrypt.hashSync('123456',10),

},
{
    name:'yaniv melloul',
    email:'yaniv@example.com',
    password:bcrypt.hashSync('123456',10),

},
]

export default users