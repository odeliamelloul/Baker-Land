import {
    RECIPE_LIST_FAIL,
    RECIPE_LIST_SUCCESS,
    RECIPE_LIST_REQUEST,
    RECIPE_CREATE_REQUEST,
    RECIPE_CREATE_SUCCESS,
    RECIPE_CREATE_FAIL,
    RECIPE_UPDATE_REQUEST, 
    RECIPE_UPDATE_SUCCESS,
    RECIPE_UPDATE_FAIL,
    RECIPE_DETAILS_FAIL,
    RECIPE_DETAILS_SUCCESS,
    RECIPE_DETAILS_REQUEST, 

} from "../constants/recipeConstant"
import axios from "axios"


export const listRecipes=()=> async(dispatch)=>
{
  try {
      dispatch({type:RECIPE_LIST_REQUEST})
      
      const {data}=await axios.get(`/api/recipes`)
      dispatch({
            type:RECIPE_LIST_SUCCESS,
            payload:data,
        }
    )
  } catch (error) {
    dispatch(
        {
            type:RECIPE_LIST_FAIL,
            payload:error.response && error.response.data.message?
            error.response.data.message: error.message
        }
    )
  }
}

export const createRecipe = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: RECIPE_CREATE_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/recipes`, {}, config)

    dispatch({
      type: RECIPE_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message

    dispatch({
      type: RECIPE_CREATE_FAIL,
      payload: message,
    })
  }
}



export const updateRecipe = (recipe) => async (dispatch, getState) => {
  try {
    dispatch({
      type: RECIPE_UPDATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put( `/api/recipes/${recipe._id}`,recipe)
    

    dispatch({
      type: RECIPE_UPDATE_SUCCESS,
      payload: data,
    })

    dispatch({ type: RECIPE_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: RECIPE_UPDATE_FAIL,
      payload: message,
    })
  }
}


export const listRecipeDetails=(id)=> async(dispatch)=>
{
  try {
      dispatch({type:RECIPE_DETAILS_REQUEST})
      const {data}=await axios.get(`/api/recipes/${id}`)
      dispatch({
            type:RECIPE_DETAILS_SUCCESS,
            payload:data,
        }
    )
  } catch (error) {
    dispatch(
        {
            type:RECIPE_DETAILS_FAIL,
            payload:error.response && error.response.data.message?
            error.response.data.message: error.message
        }
    )
  }
}
