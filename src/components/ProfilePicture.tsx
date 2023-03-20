import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Avatar, Button, Space, Upload, message } from 'antd';
import ImgCrop from 'antd-img-crop';
import type { RcFile } from 'antd/es/upload/interface';
import React, { useState } from 'react';
import { useStore } from '../store';

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const ProfilePicture: React.FC = () => {
  const { userStore } = useStore()
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
      return false;
    }

    getBase64(file, (url) => {
      setLoading(false)
      setImageUrl(url)
    })
    return false
  };

  // Insert Login for inserting image
  const handleUpload = async () => {
    setLoading(true)
    await userStore.updatePicture(imageUrl ?? "")
    setLoading(false)
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Space>
      <ImgCrop rotationSlider aspect={1}>
        <Upload
          name="avatar"
          listType="picture-circle"
          showUploadList={false}
          beforeUpload={beforeUpload}
        >
          {
          imageUrl 
            ?
            <Avatar
              src={imageUrl}
              size={100}
            />
            : 
            uploadButton
          }
        </Upload>
      </ImgCrop>
      {
        imageUrl &&
        <Button type="dashed" onClick={() => handleUpload()} loading={loading}>
          Save
        </Button>
      }
    </Space>
  );
};

export default ProfilePicture;