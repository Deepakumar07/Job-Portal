import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpService) {}

  private baseurl = environment.url;
  // For login component
  private getlogindetails = this.baseurl + 'getuserval';
  private getuserloginvalues = this.baseurl + 'getuserloginvalues';

  // Update Account

  private updateAcoount = this.baseurl + 'updateAccount';

  // To signup a user

  private addnewuserval = this.baseurl + 'addloginvalues';

  // For joblist component

  private getjoblist = this.baseurl + 'getAllJoblist';
  // private getfeaturedjobs = this.baseurl + "getfeaturedjobs";
  // private getsearchedJob = this.baseurl + "getsearchedJob";
  private updatejob = this.baseurl + 'updatejob';
  private deletejob = this.baseurl + 'deletejob';

  //  To post a Job

  private addNewJob = this.baseurl + 'addNewJob';

  // To apply a job

  private applyJob = this.baseurl + 'applyJob';

  //  For login component

  getloginvalues(data): Observable<any> {
    console.log('called once');
    return this.http.POST(this.getuserloginvalues, data);
  }

  updateAccount(data): Observable<any> {
    return this.http.PUT(this.updateAcoount, data);
  }

  // getloginvalues(data):Promise<any> {
  // //  console.log(data);
  //   return this.http.post(this.getuserloginvalues, data).then(data=>{
  //     return data;
  //   })
  // }

  // To signup new user

  addnewuser(data): Observable<any> {
    return this.http.POST(this.addnewuserval, data);
  }

  // For jobist component

  getAlljobs(): Observable<any> {
    return this.http.GET(this.getjoblist).pipe(map((data) => data.result));
  }

  // getfeatured(): Observable<any> {
  //   return this.http.GET(this.getfeaturedjobs).pipe(map(data => data.result));

  // }

  // getsearchedjob(id): Observable<any> {
  //   return this.http.POST(this.getsearchedJob, id);
  // }

  updatejobs(id): Observable<any> {
    return this.http.PUT(this.updatejob, id);
  }

  // To Delete a job

  Deletejob(val): Observable<any> {
    // console.log(val);
    return this.http.DELETE(this.deletejob + val);
  }

  //  To post a job

  postJob(id): Observable<any> {
    return this.http.POST(this.addNewJob, id);
  }

  // apply for a job

  applyJobs(id): Observable<any> {
    return this.http.POST(this.applyJob, id);
  }
}
