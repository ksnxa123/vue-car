<template>
	<el-upload
		class="avatar-uploader"
		action="http://up-z2.qiniup.com"
		:data="uploadData"
		:show-file-list="false"
		:on-success="handleAvatarSuccess"
		:before-upload="beforeAvatarUpload"
	>
		<img v-if="imageUrl" :src="imageUrl" class="avatar" />
		<i v-else class="el-icon-plus avatar-uploader-icon"></i>
	</el-upload>
</template>

<script>
import { GetQiniuToken } from "@/api/account";
export default {
	name: "",
	components: {},
	data() {
		return {
			imageUrl: "",
			uploadData: {}
		};
	},
	beforeMount(){
		 this.requestFlag && this.getQiniuToken();
	},
	methods: {
		clear(){
			this.imageUrl = "";
		},
		getQiniuToken() {
			// 在工作中，
			const requestData = {
				ak: "k-nV8vEJpmsnkBV5E8YA4ap-k_8LKFZtR5M2dPx9",
				sk :"OFCJv9RwmytE7-YNcPqe5l1S_HatbMwIVWg7uDZJ",
				buckety: "ksnxa"
			};
			GetQiniuToken(requestData).then(response => {
				const data = response.data;
				if (data.token) {
					this.$store.commit("common/SET_UPLOAD_TOKEN", data.token)
				}
			});
		},
		handleAvatarSuccess(res, file) {
			this.imageUrl = `http://ksnxa123.cn/${res.key}`;
			this.$emit("update:value", this.imageUrl)
		},
		// 上传之前
		beforeAvatarUpload(file) {
			const isJPG = file.type === "image/jpeg";
			const isLt2M = file.size / 1024 / 1024 < 2;
			if (!isJPG) {
				this.$message.error("上传头像图片只能是 JPG 格式!");
			}
			if (!isLt2M) {
				this.$message.error("上传头像图片大小不能超过 2MB!");
			}
			let fileName = file.name;
			let key = encodeURI(fileName);
			this.uploadData.key = key;
			this.uploadData.token = this.$store.state.common.upload_token;
			return isJPG && isLt2M;
		}
	},
	props: {  // 接收到的数据属于“静态数据”，是单向数据，不能反向修改
		imgUrl: {
			type: String,
			default: ""
		},
		requestFlag: {
			type: Boolean,
			default: false
		}
	},
	watch: {
		imgUrl: {
			handler(newValue){
				this.imageUrl = newValue;
			}
		}
	}
};
</script>
<style lang='scss'>
</style>