pragma solidity 0.4.18;

contract IpfsStoreHash{
	
	struct IpfsFileDetails{
		string CertificateUId;
		string IpfsHash;
	}	

	mapping(string => IpfsFileDetails)Details;

	event Reg(string msg,string _CertificateUId,string _IpfsHash);

	function SendIpfsHash(string _CertificateUId,string _IpfsHash) public {
		Details[_CertificateUId].CertificateUId=_CertificateUId;
		Details[_CertificateUId].IpfsHash = _IpfsHash;
		Reg("Saved",Details[_CertificateUId].CertificateUId,Details[_CertificateUId].IpfsHash);
	}

	function GetIpfsHash(string _CertificateUId) public view returns(string) {
		return Details[_CertificateUId].IpfsHash;
	}
}