export class RegisterDto{
    //public string Username { get; set; }
    //public string Alias { get; set; }
    //public string Email { get; set; }
    //public string Password { get; set; }
    //public DateTime Birth { get; set; }
    username:string='';
    alias:string='';
    email:string='';
    password:string='';
    birth:Date=new Date();
}
export class LoginDto{
    //public string Email { get; set; }
    //public string Password { get; set; }

    username:string='';
    password:string='';
}
export class ProfileDto{
    //public string Email { get; set; }
    //public string Password { get; set; }

    username:string='';
    alias:string='';
    email:string='';
    image:string='';
    birth:Date=new Date();
}