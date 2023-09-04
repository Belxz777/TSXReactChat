const checkAllInfo = 'SELECT * FROM public.socketbase WHERE id=$1'
//здесь можно писать запросы 
const takeAllbyToken = 'SELECT * FROM public.socketbase WHERE token=$1 '
//проверка на наличие айди
const addNewUser = 'INSERT INTO public.socketbase (id,name,password,photo,token) VALUES($1,$2,$3,$4,$5)'
//экспорты для того что бы это видеть в других файлах
const deleteUser = 'DELETE FROM public.socketbase WHERE id=$1'
const updateUserInfo  = 'UPDATE public.socketbase SET  name=$2 ,password =$3 WHERE id=$4'

module.exports={
   checkAllInfo,
   takeAllbyToken,
   addNewUser,
   deleteUser,
   updateUserInfo
}