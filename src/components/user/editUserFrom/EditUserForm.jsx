import React, {useState,useCallback} from 'react'
import {Form, Col, Row, Button,Spinner} from  'react-bootstrap'
import DatePicker from 'react-datepicker'
import es from 'date-fns/locale/es'
import { useDropzone } from 'react-dropzone'
import { API_HOST } from '../../../utils/constans'
import { toast } from 'react-toastify'
import { Camera } from '../../../utils/Icons'
import { updateBannerAPI, updateAvatarAPI, modifyProfileAPI } from '../../../api/User'

import './EditUserForm.scss'

export default function EditUserForm(props) {

    const { user, setShow } = props;

    
    const [formData,setFormData] = useState(initValue(user));



    const [bannerURL , setBannerURL] = useState(
        user?.banner ? `${API_HOST}/oB?i=${user.idU}` : null
    )

    const [avatarURL,setAvatarURL] = useState(
        user?.avatar ? `${API_HOST}/oA?i=${user.idU}` : null
    )

    const [avatarFile, setAvatarFile] = useState(null);

    const [bannerFile,setBannerFile] = useState(null);

    const [spinner,setSpinner] = useState(false);


    const onDropAvatar = useCallback(acceptedFile => {
        const file = acceptedFile[0];
        setAvatarURL(URL.createObjectURL(file))
        setAvatarFile(file)
    })

    const onDropBanner = useCallback(acceptedFile => {
        const file = acceptedFile[0];
        setBannerURL( URL.createObjectURL(file) )
        setBannerFile(file)
    })


    const {getRootProps : getRootAvatarProps ,getInputProps: getInputAvatarProps } = useDropzone ({
        accept: "image/jpeg , image/jpg , image/svg",
        noKeyboard: true,
        multiple: false,
        onDrop: onDropAvatar
    })

    const { getRootProps : getRootBannerProps,getInputProps : getInputBannerProps } =useDropzone ({
        accept: "image/jpeg , image/jpg , image/svg",
        noKeyboard: true,
        multiple: false,
        onDrop: onDropBanner
    })

    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value })
    }

    const submit = async e => {
        e.preventDefault();
        setSpinner(true);

        if(bannerFile) {
            await updateBannerAPI(bannerFile).catch(() => {
                toast.error("Couldn't Update The Banner!!, Try Again Later")
            })
        }
        if(avatarFile) {
            await updateAvatarAPI(avatarFile).catch(() => {
                toast.error("Couldn't Update The Avatar!!, Try Again Later")
            }) 
        }
        await modifyProfileAPI(formData)
        .then(() => {
            setShow(false)
        })
        .catch(() => {
            toast.error("There was an error trying to modify your profile, try again later")
        })

        setSpinner(false)

        window.location.reload();
    }


  return (
    <div className="edit-user">
        <Form onSubmit={submit}>
            <div className="banner" style={{backgroundImage : `url('${bannerURL}')`}} { ...getRootBannerProps()} >
                <input {...getInputBannerProps()} />
                <Camera />
            </div>
            <div className='avatar' style={{backgroundImage: `url('${avatarURL}')`}} { ...getRootAvatarProps() } >
                <input {...getInputAvatarProps()} />
                <Camera />
            </div>
            <Form.Group>
                <Row>
                    <Col>
                        <Form.Control type="text" placeholder="Name" name="name" defaultValue={formData.name} onChange={onChange}/>
                    </Col>

                    <Col>
                        <Form.Control type="text" placeholder="LastName" name="lastN" defaultValue={formData.lastN} onChange={onChange} />
                    </Col>
                </Row>
            </Form.Group>

            <Form.Group>
                <Form.Control as="textarea" rows="6" placeholder="Change Your Biography!!"  name="bio" defaultValue={formData.bio} onChange={onChange} />
            </Form.Group>

            <Form.Group>
                <Form.Control type="text" placeholder="Website" name="web" defaultValue={formData.web} onChange={onChange} />
            </Form.Group>

            <Form.Group>
                <DatePicker placeholder="Birthday" locale={es} selected={new Date(formData.bDAY)} onChange={date => setFormData({...formData, bDAY: date })} />
            </Form.Group>

            <Button className="btn-submit" variant="primary" type="submit" >
                {!spinner ? "Update" : <Spinner animation="border" size="sm"/>}
            </Button>
        </Form>
    </div>
  )
}

function initValue(user) {
    return {
        name: user.name || "",
        lastN: user.lastN || "",
        bio: user.bio || "",
        loc: user.loc  || "",
        web: user.web || "",
        bDAY: user.bDAY || ""
    }
}
