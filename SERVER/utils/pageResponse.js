
class PageResponse{
    constructor(status, message, pageNum, totalPages, entriesOnPage, totalEntries, data){
        this.status = status; 
        this.message = message; 
        this.pageNum = pageNum,
        this.totalPages = totalPages, 
        this.entriesOnPage = entriesOnPage, 
        this.totalEntries = totalEntries,
        this.data = data
    } 

    result(){

        const finalRes = {};
        finalRes.status = this.status;
        finalRes.message = this.message; 
        finalRes.pageNum = this.pageNum;
        finalRes.totalPages = this.totalPages;
        finalRes.entriesOnPage = this.entriesOnPage;
        finalRes.totalEntries = this.totalEntries;
        finalRes.data = this.data;
        return finalRes;
    }
}


export default PageResponse; 
