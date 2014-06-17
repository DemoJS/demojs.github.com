namespace Demo

open System
open System.IO
open System.Web
open IntelliFactory.WebSharper.Sitelets

type Action =
    | Index

module Main =
    open IntelliFactory.WebSharper
    open IntelliFactory.Html

    let Index =
        PageContent <| fun context ->
            { Page.Default with
                Doctype = Some "<!DOCTYPE HTML PUBLIC \"- \/\/W3C//DTD HTML 4.01//EN\" \"http://www.w3.org/TR/html4/strict.dtd\">"
                Title = Some "Color the wind - Tarmil / Ctrl-Alt-Test"
                Body = [Div [Id "wrapper"] -< [new Demo.DemoControl()]]
                Head = [Link [Rel "stylesheet"; HRef "style.css"]]
            }

type MySampleWebsite() =
    interface IWebsite<Action> with
        member this.Sitelet =
            Sitelet.Content "/index" Action.Index Main.Index
        member this.Actions =
            [Action.Index]

[<assembly: WebsiteAttribute(typeof<MySampleWebsite>)>]
do ()
