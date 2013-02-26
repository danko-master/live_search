class LiveSearchController < ApplicationController
  def index
    @group_id = params[:group_id].to_i
    
    @back = "none"
    @forward = "none"
  end
  def result
    search_query = params[:search_query]
    group_id = params[:group_id].to_i
    page_number = params[:page_number].to_i
    page_number ||= 1
    #page_number = 1
    
    
    @providers = Provider.search_by_title(group_id, page_number, search_query) if group_id
    
    
    @back = "none"
    if page_number > 1
      @back = "inline-block"
      @page_back = page_number - 1
    end
    
    @forward = "none" 
    if @providers.count > 4
      @forward = "inline-block"
      @page_next = page_number + 1
    end 
  end
end
